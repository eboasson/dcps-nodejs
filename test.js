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

var ref = require('ref');
var Struct = require('ref-struct');
var ShapeType = Struct({
    'color': ref.types.CString,
    'x': ref.types.int32,
    'y': ref.types.int32,
    'shapesize': ref.types.int32
});
var ShapeTypeMD = {
    name: 'ShapeType',
    keylist: 'color',
    metadata: '<MetaData version="1.0.0"><Struct name="ShapeType"><Member name="color"><String/></Member><Member name="x"><Long/></Member><Member name="y"><Long/></Member><Member name="shapesize"><Long/></Member></Struct></MetaData>'
};

var dpf = dds.DomainParticipantFactory_get_instance();
var qos;

qos = dds.DomainParticipantQos__alloc();
dds.DomainParticipantFactory_get_default_participant_qos(dpf, qos);
var dp = dds.DomainParticipantFactory_create_participant(dpf, dds.default_domain_id, qos, null, 0);
dds.free(qos);

var ts = dds.TypeSupport__alloc(ShapeTypeMD.name, ShapeTypeMD.keylist, ShapeTypeMD.metadata);
dds.TypeSupport_register_type(ts, dp, ShapeTypeMD.name);
qos = dds.TopicQos__alloc();
dds.DomainParticipant_get_default_topic_qos(dp, qos);
var q = qos.deref();
// modifying q modifies the underlying buffer
q.durability.kind = dds.Durability.PERSISTENT;
q.durability_service.service_cleanup_delay.sec = 3600;
q.durability_service.service_cleanup_delay.nanosec = 0;
q.durability_service.history_kind = dds.History.KEEP_LAST;
q.durability_service.history_depth = 100;
q.durability_service.max_samples = 8192;
q.durability_service.max_instances = 4196;
q.durability_service.max_samples_per_instance = 8192;
var tp = dds.DomainParticipant_create_topic(dp, "Circle", "ShapeType", qos, null, 0);
dds.free(ts);
dds.free(qos);

qos = dds.PublisherQos__alloc();
dds.DomainParticipant_get_default_publisher_qos(dp, qos);
var pub = dds.DomainParticipant_create_publisher(dp, qos, null, 0);
dds.free(qos);

qos = dds.DataWriterQos__alloc();
dds.Publisher_get_default_datawriter_qos(pub, qos);
var wr = dds.Publisher_create_datawriter(pub, tp, qos, null, 0);
dds.free(qos);

qos = dds.SubscriberQos__alloc();
dds.DomainParticipant_get_default_subscriber_qos(dp, qos);
var sub = dds.DomainParticipant_create_subscriber(dp, qos, null, 0);
dds.free(qos);

qos = dds.DataReaderQos__alloc();
dds.Subscriber_get_default_datareader_qos(sub, qos);
var rd = dds.Subscriber_create_datareader(sub, tp, qos, null, 0);
dds.free(qos);

var step = 3;
var r = new ShapeType({ 'x': 10, 'y': 10, 'shapesize': 30, 'color': 'RED' });
var s = new ShapeType({ 'x': 200, 'y': 200, 'shapesize': 30, 'color': 'BLUE' });
var iseq = new dds.SampleInfoSeq({ '_length': 0, '_maximum': 0, '_buffer': null, '_release': false });
var mseq = new dds.SequenceType(ShapeType)({ '_length': 0, '_maximum': 0, '_buffer': null, '_release': false });
while(true) {
    dds.DataWriter_write(wr, r.ref(), dds.HANDLE_NIL);
    dds.DataWriter_write(wr, s.ref(), dds.HANDLE_NIL);

    var rc = dds.DataReader_read(rd, mseq.ref(), iseq.ref(), dds.LENGTH_UNLIMITED, dds.ANY_SAMPLE_STATE, dds.ANY_VIEW_STATE, dds.ANY_INSTANCE_STATE);
    iseq._buffer.length = iseq._length;
    mseq._buffer.length = iseq._length;
    for (i = 0; i < iseq._length; i++) {
        console.log(iseq._buffer[i]);
        console.log(mseq._buffer[i]);
    }
    dds.DataReader_return_loan(rd, mseq.ref(), iseq.ref());
    
    r.x += step; r.y += step;
    s.x -= step; s.y -= step;
    if (r.x >= 200) { step = -step; }
    sleep.sleep(1);
}

dds.DomainParticipant_delete_contained_entities(dp);
dds.DomainParticipantFactory_delete_participant(dpf, dp);
