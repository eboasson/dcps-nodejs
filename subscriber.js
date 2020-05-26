// Copyright(c) 2006 to 2019 ADLINK Technology Limited and others
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0, or the Eclipse Distribution License
// v. 1.0 which is available at
// http://www.eclipse.org/org/documents/edl-v10.php.
//
// SPDX-License-Identifier: EPL-2.0 OR BSD-3-Clause

var dds = require('./dds');

var partitionName = 'Throughput example';
if (process.argv.length > 2) partitionName = process.argv[2];

var ref = require('ref');
var Struct = require('ref-struct');
var DataType = Struct({
    'count': ref.types.uint64,
    'payload': dds.SequenceType(ref.types.uint8)
});
var DataTypeMD = {
    name: 'ThroughputModule::DataType',
    keylist: '',
    metadata: '<MetaData version="1.0.0"><Module name="ThroughputModule"><Struct name="DataType"><Member name="count"><ULongLong/></Member><Member name="payload"><Sequence><Octet/></Sequence></Member></Struct></Module></MetaData>'
};

var dpf = dds.DomainParticipantFactory_get_instance();
var qos;

qos = dds.DomainParticipantQos__alloc();
dds.DomainParticipantFactory_get_default_participant_qos(dpf, qos);
var dp = dds.DomainParticipantFactory_create_participant(dpf, dds.default_domain_id, qos, null, 0);
dds.free(qos);

var ts = dds.TypeSupport__alloc(DataTypeMD.name, DataTypeMD.keylist, DataTypeMD.metadata);
dds.TypeSupport_register_type(ts, dp, DataTypeMD.name);
var tqos = dds.TopicQos__alloc();
dds.DomainParticipant_get_default_topic_qos(dp, tqos);
var tp = dds.DomainParticipant_create_topic(dp, "Throughput", DataTypeMD.name, tqos, null, 0);
dds.free(ts);

qos = dds.SubscriberQos__alloc();
dds.DomainParticipant_get_default_subscriber_qos(dp, qos);
{
    var ns = [partitionName];
    var q = qos.deref();
    if (q.partition.name._maximum != 0) { // not sure if this is correct
        dds.free(q.partition.name._buffer.ref());
    }
    q.partition.name._length = 1;
    q.partition.name._maximum = 1;
    q.partition.name._release = false;
    q.partition.name._buffer = ns;
}
var sub = dds.DomainParticipant_create_subscriber(dp, qos, null, 0);
dds.free(qos);

qos = dds.DataReaderQos__alloc();
dds.Subscriber_get_default_datareader_qos(sub, qos);
dds.Subscriber_copy_from_topic_qos(sub, qos, tqos);
{
    var q = qos.deref();
    q.reliability.kind = dds.Reliability.RELIABLE;
    q.reliability.max_blocking_time.sec = 10;
    q.reliability.max_blocking_time.nanosec = 0;
    q.history.kind = dds.History.KEEP_ALL;
    q.resource_limits.max_samples = 400;
}
var rd = dds.Subscriber_create_datareader(sub, tp, qos, null, 0);
dds.free(qos);
dds.free(tqos);

var sc = dds.Entity_get_statuscondition(rd);
var smask = dds.DATA_AVAILABLE_STATUS;
dds.StatusCondition_set_enabled_statuses(sc, smask);

var ws = dds.WaitSet__alloc();
dds.WaitSet_attach_condition(ws, sc);

console.log('partitionName: ' + partitionName);

var outOfOrder = 0;
var startCount = {};
var count = {};
var prevCount = {};
var received = 0;
var prevTime = [0, 0];
var startTime;
var prevReceived;
var payloadSize = 0;

var iseq = new dds.SampleInfoSeq({ '_length': 0, '_maximum': 0, '_buffer': null, '_release': false });
var mseq = new dds.SequenceType(DataType)({ '_length': 0, '_maximum': 0, '_buffer': null, '_release': false });
var cseqRaw = dds.ConditionSeq__alloc(); // use alloc so I can use free
var timeout = new dds.Duration_t({ 'sec': dds.DURATION_INFINITE_SEC, 'nanosec': dds.DURATION_INFINITE_NSEC });
while(true) {
    dds.WaitSet_wait(ws, cseqRaw, timeout.ref());
    
    var cseq = cseqRaw.deref();
    cseq._buffer.length = cseq._length;
    for (i = 0; i < cseq._length; i++) {
        if (sc.address() == cseq._buffer[i].address()) {
            dds.DataReader_take(rd, mseq.ref(), iseq.ref(), dds.LENGTH_UNLIMITED, dds.ANY_SAMPLE_STATE, dds.ANY_VIEW_STATE, dds.ANY_INSTANCE_STATE);
            iseq._buffer.length = iseq._length;
            mseq._buffer.length = iseq._length;
            for (i = 0; i < iseq._length; i++) {
                var sample = mseq._buffer[i];
                if (!iseq._buffer[i].valid_data) {
                    continue;
                }
                var ph = iseq._buffer[i].publication_handle;
                if (!(ph in startCount && ph in count)) {
                    startCount[ph] = sample.count;
                    count[ph] = sample.count;
                }
                if (sample.count != count[ph]) {
                    outOfOrder++;
                }
                count[ph] = sample.count + 1;
                payloadSize = sample.payload._length;
                received += payloadSize + 8;
            }
            dds.DataReader_return_loan(rd, mseq.ref(), iseq.ref());
        }
    }

    var time = process.hrtime();
    if (time[0] > prevTime[0]+1 || (time[0] == prevTime[0]+1 && time[1] >= prevTime[1])) {
        if (prevTime[0] == 0) {
            for (k in startCount) {
                prevCount[k] = startCount[k];
            }
            startTime = time;
        } else {
            var deltaReceived = received - prevReceived;
            var deltaTime = (time[0] - prevTime[0]) + (time[1] - prevTime[1]) / 1e9;
            var samplesReceivedT = 0;
            var samplesReceived = 0;
            for (k in count) {
                samplesReceivedT += count[k] - startCount[k];
                samplesReceived += count[k] - prevCount[k];
                prevCount[k] = count[k];
            }
            var rate = samplesReceived / deltaTime;
            var rateB = (deltaReceived / deltaTime) / 125000;
            console.log ('Payload size: ' + payloadSize + ' | Total received: ' + samplesReceivedT + ' samples, ' + received + ' bytes | Out of order: ' + outOfOrder + ' samples | Transfer rate: ' + rate + ' samples/s, ' + rateB + ' Mbit/s');
        }
        prevReceived = received;
        prevTime = time;
    }
}
dds.free(cseqRaw);

dds.DomainParticipant_delete_contained_entities(dp);
dds.DomainParticipantFactory_delete_participant(dpf, dp);
