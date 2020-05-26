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
var sleep = require('sleep');

var payloadSize = 4096;
var partitionName = 'Throughput example';
if (process.argv.length > 2) payloadSize = process.argv[2];
if (process.argv.length > 3) partitionName = process.argv[6];

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

qos = dds.PublisherQos__alloc();
dds.DomainParticipant_get_default_publisher_qos(dp, qos);
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
var pub = dds.DomainParticipant_create_publisher(dp, qos, null, 0);
dds.free(qos);

qos = dds.DataWriterQos__alloc();
dds.Publisher_get_default_datawriter_qos(pub, qos);
dds.Publisher_copy_from_topic_qos(pub, qos, tqos);
{
    var q = qos.deref();
    q.reliability.kind = dds.Reliability.RELIABLE;
    q.reliability.max_blocking_time.sec = 10;
    q.reliability.max_blocking_time.nanosec = 0;
    q.history.kind = dds.History.KEEP_ALL;
    q.resource_limits.max_samples = 100;
}
var wr = dds.Publisher_create_datawriter(pub, tp, qos, null, 0);
dds.free(qos);
dds.free(tqos);

console.log('waiting for subscriber ...');
var matched = false;
while(!matched) {
    var pms = new dds.PublicationMatchedStatus();
    dds.DataWriter_get_publication_matched_status(wr, pms.ref());
    if (pms.current_count > 0) {
        matched = true;
    } else {
        sleep.sleep(1);
    }
}

console.log('payloadSize: ' + payloadSize + ' | partitionName: ' + partitionName);

var buffer = [];
for (i = 0; i < payloadSize; i++) {
    buffer[i] = 'a';
}
var sample = new DataType({
    'count': 0,
    'payload': {
        '_length': payloadSize,
        '_maximum': payloadSize,
        '_buffer': buffer,
        '_release': false
    }
});
var sampleref = sample.ref();
var handle = dds.DataWriter_register_instance(wr, sampleref);
while(true) {
    sample.count++;
    dds.DataWriter_write(wr, sampleref, handle);
}

dds.DomainParticipant_delete_contained_entities(dp);
dds.DomainParticipantFactory_delete_participant(dpf, dp);
