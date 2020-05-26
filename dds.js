var ref = require('ref');
var FFI = require('ffi');
var Struct = require('ref-struct');
var ArrayType = require('ref-array');
exports.SequenceType = function (t) {
  return Struct({
    _length: ref.types.uint32,
    _maximum: ref.types.uint32,
    _buffer: ArrayType(t),
    _release: ref.types.bool
  });
}
exports.ddsObject = ref.refType(ref.types.void);
exports.octSeq = exports.SequenceType(ref.types.uint8);
exports.BuiltinTopicKey_t = ArrayType(ref.types.int32, 3);
exports.StringSeq = exports.SequenceType(ref.types.CString);
exports.DataRepresentationId_t = ref.types.int16;
exports.Duration_t = Struct({
  'sec': ref.types.int32,
  'nanosec': ref.types.uint32
});
exports.UserData = Struct({
  'value': exports.octSeq
});
exports.TopicData = Struct({
  'value': exports.octSeq
});
exports.GroupData = Struct({
  'value': exports.octSeq
});
exports.TransportPriority = Struct({
  'value': ref.types.int32
});
exports.Lifespan = Struct({
  'duration': exports.Duration_t
});
exports.DurabilityQosPolicyKind = ref.types.int;
exports.Durability = Struct({
  'kind': exports.DurabilityQosPolicyKind
});
exports.PresentationQosPolicyAccessScopeKind = ref.types.int;
exports.Presentation = Struct({
  'access_scope': exports.PresentationQosPolicyAccessScopeKind,
  'coherent_access': ref.types.bool,
  'ordered_access': ref.types.bool
});
exports.Deadline = Struct({
  'period': exports.Duration_t
});
exports.LatencyBudget = Struct({
  'duration': exports.Duration_t
});
exports.OwnershipQosPolicyKind = ref.types.int;
exports.Ownership = Struct({
  'kind': exports.OwnershipQosPolicyKind
});
exports.OwnershipStrength = Struct({
  'value': ref.types.int32
});
exports.LivelinessQosPolicyKind = ref.types.int;
exports.Liveliness = Struct({
  'kind': exports.LivelinessQosPolicyKind,
  'lease_duration': exports.Duration_t
});
exports.TimeBasedFilter = Struct({
  'minimum_separation': exports.Duration_t
});
exports.Partition = Struct({
  'name': exports.StringSeq
});
exports.ReliabilityQosPolicyKind = ref.types.int;
exports.Reliability = Struct({
  'kind': exports.ReliabilityQosPolicyKind,
  'max_blocking_time': exports.Duration_t,
  'synchronous': ref.types.bool
});
exports.DestinationOrderQosPolicyKind = ref.types.int;
exports.DestinationOrder = Struct({
  'kind': exports.DestinationOrderQosPolicyKind
});
exports.HistoryQosPolicyKind = ref.types.int;
exports.History = Struct({
  'kind': exports.HistoryQosPolicyKind,
  'depth': ref.types.int32
});
exports.ResourceLimits = Struct({
  'max_samples': ref.types.int32,
  'max_instances': ref.types.int32,
  'max_samples_per_instance': ref.types.int32
});
exports.DurabilityService = Struct({
  'service_cleanup_delay': exports.Duration_t,
  'history_kind': exports.HistoryQosPolicyKind,
  'history_depth': ref.types.int32,
  'max_samples': ref.types.int32,
  'max_instances': ref.types.int32,
  'max_samples_per_instance': ref.types.int32
});
exports.ProductData = Struct({
  'value': ref.types.CString
});
exports.EntityFactory = Struct({
  'autoenable_created_entities': ref.types.bool
});
exports.Share = Struct({
  'name': ref.types.CString,
  'enable': ref.types.bool
});
exports.WriterDataLifecycle = Struct({
  'autodispose_unregistered_instances': ref.types.bool,
  'autopurge_suspended_samples_delay': exports.Duration_t,
  'autounregister_instance_delay': exports.Duration_t
});
exports.InvalidSampleVisibilityQosPolicyKind = ref.types.int;
exports.InvalidSampleVisibility = Struct({
  'kind': exports.InvalidSampleVisibilityQosPolicyKind
});
exports.SubscriptionKey = Struct({
  'use_key_list': ref.types.bool,
  'key_list': exports.StringSeq
});
exports.ReaderDataLifecycle = Struct({
  'autopurge_nowriter_samples_delay': exports.Duration_t,
  'autopurge_disposed_samples_delay': exports.Duration_t,
  'autopurge_dispose_all': ref.types.bool,
  'enable_invalid_samples': ref.types.bool,
  'invalid_sample_visibility': exports.InvalidSampleVisibility
});
exports.UserKey = Struct({
  'enable': ref.types.bool,
  'expression': ref.types.CString
});
exports.ReaderLifespan = Struct({
  'use_lifespan': ref.types.bool,
  'duration': exports.Duration_t
});
exports.TypeHash = Struct({
  'msb': ref.types.uint64,
  'lsb': ref.types.uint64
});
exports.ParticipantBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'user_data': exports.UserData
});
exports.TopicBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'name': ref.types.CString,
  'type_name': ref.types.CString,
  'durability': exports.Durability,
  'durability_service': exports.DurabilityService,
  'deadline': exports.Deadline,
  'latency_budget': exports.LatencyBudget,
  'liveliness': exports.Liveliness,
  'reliability': exports.Reliability,
  'transport_priority': exports.TransportPriority,
  'lifespan': exports.Lifespan,
  'destination_order': exports.DestinationOrder,
  'history': exports.History,
  'resource_limits': exports.ResourceLimits,
  'ownership': exports.Ownership,
  'topic_data': exports.TopicData
});
exports.TypeBuiltinTopicData = Struct({
  'name': ref.types.CString,
  'data_representation_id': exports.DataRepresentationId_t,
  'type_hash': exports.TypeHash,
  'meta_data': exports.octSeq,
  'extentions': exports.octSeq
});
exports.PublicationBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'participant_key': exports.BuiltinTopicKey_t,
  'topic_name': ref.types.CString,
  'type_name': ref.types.CString,
  'durability': exports.Durability,
  'deadline': exports.Deadline,
  'latency_budget': exports.LatencyBudget,
  'liveliness': exports.Liveliness,
  'reliability': exports.Reliability,
  'lifespan': exports.Lifespan,
  'destination_order': exports.DestinationOrder,
  'user_data': exports.UserData,
  'ownership': exports.Ownership,
  'ownership_strength': exports.OwnershipStrength,
  'presentation': exports.Presentation,
  'partition': exports.Partition,
  'topic_data': exports.TopicData,
  'group_data': exports.GroupData
});
exports.SubscriptionBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'participant_key': exports.BuiltinTopicKey_t,
  'topic_name': ref.types.CString,
  'type_name': ref.types.CString,
  'durability': exports.Durability,
  'deadline': exports.Deadline,
  'latency_budget': exports.LatencyBudget,
  'liveliness': exports.Liveliness,
  'reliability': exports.Reliability,
  'ownership': exports.Ownership,
  'destination_order': exports.DestinationOrder,
  'user_data': exports.UserData,
  'time_based_filter': exports.TimeBasedFilter,
  'presentation': exports.Presentation,
  'partition': exports.Partition,
  'topic_data': exports.TopicData,
  'group_data': exports.GroupData
});
exports.CMParticipantBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'product': exports.ProductData
});
exports.CMPublisherBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'product': exports.ProductData,
  'participant_key': exports.BuiltinTopicKey_t,
  'name': ref.types.CString,
  'entity_factory': exports.EntityFactory,
  'partition': exports.Partition
});
exports.CMSubscriberBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'product': exports.ProductData,
  'participant_key': exports.BuiltinTopicKey_t,
  'name': ref.types.CString,
  'entity_factory': exports.EntityFactory,
  'share': exports.Share,
  'partition': exports.Partition
});
exports.CMDataWriterBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'product': exports.ProductData,
  'publisher_key': exports.BuiltinTopicKey_t,
  'name': ref.types.CString,
  'history': exports.History,
  'resource_limits': exports.ResourceLimits,
  'writer_data_lifecycle': exports.WriterDataLifecycle
});
exports.CMDataReaderBuiltinTopicData = Struct({
  'key': exports.BuiltinTopicKey_t,
  'product': exports.ProductData,
  'subscriber_key': exports.BuiltinTopicKey_t,
  'name': ref.types.CString,
  'history': exports.History,
  'resource_limits': exports.ResourceLimits,
  'reader_data_lifecycle': exports.ReaderDataLifecycle,
  'subscription_keys': exports.UserKey,
  'reader_lifespan': exports.ReaderLifespan,
  'share': exports.Share
});
exports.Time_t = Struct({
  'sec': ref.types.int32,
  'nanosec': ref.types.uint32
});
exports.SchedulingClassQosPolicyKind = ref.types.int;
exports.SchedulingClass = Struct({
  'kind': exports.SchedulingClassQosPolicyKind
});
exports.SchedulingPriorityQosPolicyKind = ref.types.int;
exports.SchedulingPriority = Struct({
  'kind': exports.SchedulingPriorityQosPolicyKind
});
exports.Scheduling = Struct({
  'scheduling_class': exports.SchedulingClass,
  'scheduling_priority_kind': exports.SchedulingPriority,
  'scheduling_priority': ref.types.int32
});
exports.ViewKey = Struct({
  'use_key_list': ref.types.bool,
  'key_list': exports.StringSeq
});
exports.DataReaderViewQos = Struct({
  'view_keys': exports.ViewKey
});
exports.DomainParticipantFactoryQos = Struct({
  'entity_factory': exports.EntityFactory
});
exports.DomainParticipantQos = Struct({
  'user_data': exports.UserData,
  'entity_factory': exports.EntityFactory,
  'watchdog_scheduling': exports.Scheduling,
  'listener_scheduling': exports.Scheduling
});
exports.TopicQos = Struct({
  'topic_data': exports.TopicData,
  'durability': exports.Durability,
  'durability_service': exports.DurabilityService,
  'deadline': exports.Deadline,
  'latency_budget': exports.LatencyBudget,
  'liveliness': exports.Liveliness,
  'reliability': exports.Reliability,
  'destination_order': exports.DestinationOrder,
  'history': exports.History,
  'resource_limits': exports.ResourceLimits,
  'transport_priority': exports.TransportPriority,
  'lifespan': exports.Lifespan,
  'ownership': exports.Ownership
});
exports.DataWriterQos = Struct({
  'durability': exports.Durability,
  'deadline': exports.Deadline,
  'latency_budget': exports.LatencyBudget,
  'liveliness': exports.Liveliness,
  'reliability': exports.Reliability,
  'destination_order': exports.DestinationOrder,
  'history': exports.History,
  'resource_limits': exports.ResourceLimits,
  'transport_priority': exports.TransportPriority,
  'lifespan': exports.Lifespan,
  'user_data': exports.UserData,
  'ownership': exports.Ownership,
  'ownership_strength': exports.OwnershipStrength,
  'writer_data_lifecycle': exports.WriterDataLifecycle
});
exports.PublisherQos = Struct({
  'presentation': exports.Presentation,
  'partition': exports.Partition,
  'group_data': exports.GroupData,
  'entity_factory': exports.EntityFactory
});
exports.DataReaderQos = Struct({
  'durability': exports.Durability,
  'deadline': exports.Deadline,
  'latency_budget': exports.LatencyBudget,
  'liveliness': exports.Liveliness,
  'reliability': exports.Reliability,
  'destination_order': exports.DestinationOrder,
  'history': exports.History,
  'resource_limits': exports.ResourceLimits,
  'user_data': exports.UserData,
  'ownership': exports.Ownership,
  'time_based_filter': exports.TimeBasedFilter,
  'reader_data_lifecycle': exports.ReaderDataLifecycle,
  'subscription_keys': exports.SubscriptionKey,
  'reader_lifespan': exports.ReaderLifespan,
  'share': exports.Share
});
exports.SubscriberQos = Struct({
  'presentation': exports.Presentation,
  'partition': exports.Partition,
  'group_data': exports.GroupData,
  'entity_factory': exports.EntityFactory,
  'share': exports.Share
});
exports.DomainId_t = ref.types.int32;
exports.InstanceHandle_t = ref.types.int64;
exports.InstanceHandleSeq = exports.SequenceType(exports.InstanceHandle_t);
exports.ReturnCode_t = ref.types.int32;
exports.QosPolicyId_t = ref.types.int32;
exports.ErrorCode_t = ref.types.int32;
exports.StatusKind = ref.types.uint32;
exports.StatusMask = ref.types.uint32;
exports.InconsistentTopicStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32
});
exports.AllDataDisposedTopicStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32
});
exports.SampleLostStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32
});
exports.SampleRejectedStatusKind = ref.types.int;
exports.SampleRejectedStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'last_reason': exports.SampleRejectedStatusKind,
  'last_instance_handle': exports.InstanceHandle_t
});
exports.LivelinessLostStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32
});
exports.LivelinessChangedStatus = Struct({
  'alive_count': ref.types.int32,
  'not_alive_count': ref.types.int32,
  'alive_count_change': ref.types.int32,
  'not_alive_count_change': ref.types.int32,
  'last_publication_handle': exports.InstanceHandle_t
});
exports.OfferedDeadlineMissedStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'last_instance_handle': exports.InstanceHandle_t
});
exports.RequestedDeadlineMissedStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'last_instance_handle': exports.InstanceHandle_t
});
exports.QosPolicyCount = Struct({
  'policy_id': exports.QosPolicyId_t,
  'count': ref.types.int32
});
exports.QosPolicyCountSeq = exports.SequenceType(exports.QosPolicyCount);
exports.OfferedIncompatibleQosStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'last_policy_id': exports.QosPolicyId_t,
  'policies': exports.QosPolicyCountSeq
});
exports.RequestedIncompatibleQosStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'last_policy_id': exports.QosPolicyId_t,
  'policies': exports.QosPolicyCountSeq
});
exports.PublicationMatchedStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'current_count': ref.types.int32,
  'current_count_change': ref.types.int32,
  'last_subscription_handle': exports.InstanceHandle_t
});
exports.SubscriptionMatchedStatus = Struct({
  'total_count': ref.types.int32,
  'total_count_change': ref.types.int32,
  'current_count': ref.types.int32,
  'current_count_change': ref.types.int32,
  'last_publication_handle': exports.InstanceHandle_t
});
exports.Listener = exports.ddsObject;
exports.PropertyInterface = exports.ddsObject;
exports.Entity = exports.ddsObject;
exports.TopicDescription = exports.ddsObject;
exports.Topic = exports.ddsObject;
exports.ContentFilteredTopic = exports.ddsObject;
exports.MultiTopic = exports.ddsObject;
exports.DataWriter = exports.ddsObject;
exports.DataReader = exports.ddsObject;
exports.DataReaderView = exports.ddsObject;
exports.Subscriber = exports.ddsObject;
exports.Publisher = exports.ddsObject;
exports.ObjSeq = exports.SequenceType(exports.ddsObject);
exports.TopicSeq = exports.SequenceType(exports.Topic);
exports.DataReaderSeq = exports.SequenceType(exports.DataReader);
exports.Listener = exports.ddsObject;
exports.TopicListener = exports.ddsObject;
exports.ExtTopicListener = exports.ddsObject;
exports.DataWriterListener = exports.ddsObject;
exports.PublisherListener = exports.ddsObject;
exports.DataReaderListener = exports.ddsObject;
exports.SubscriberListener = exports.ddsObject;
exports.DomainParticipantListener = exports.ddsObject;
exports.ExtDomainParticipantListener = exports.ddsObject;
exports.Condition = exports.ddsObject;
exports.ConditionSeq = exports.SequenceType(exports.Condition);
exports.WaitSetInterface = exports.ddsObject;
exports.GuardConditionInterface = exports.ddsObject;
exports.StatusCondition = exports.ddsObject;
exports.SampleStateKind = ref.types.uint32;
exports.SampleStateSeq = exports.SequenceType(exports.SampleStateKind);
exports.SampleStateMask = ref.types.uint32;
exports.ViewStateKind = ref.types.uint32;
exports.ViewStateSeq = exports.SequenceType(exports.ViewStateKind);
exports.ViewStateMask = ref.types.uint32;
exports.InstanceStateKind = ref.types.uint32;
exports.InstanceStateSeq = exports.SequenceType(exports.InstanceStateKind);
exports.InstanceStateMask = ref.types.uint32;
exports.ReadCondition = exports.ddsObject;
exports.QueryCondition = exports.ddsObject;
exports.Property = Struct({
  'name': ref.types.CString,
  'value': ref.types.CString
});
exports.PropertyInterface = exports.ddsObject;
exports.Entity = exports.ddsObject;
exports.DomainParticipant = exports.ddsObject;
exports.Domain = exports.ddsObject;
exports.DomainParticipantFactoryInterface = exports.ddsObject;
exports.TypeSupport = exports.ddsObject;
exports.TopicDescription = exports.ddsObject;
exports.Topic = exports.ddsObject;
exports.ContentFilteredTopic = exports.ddsObject;
exports.MultiTopic = exports.ddsObject;
exports.Publisher = exports.ddsObject;
exports.DataWriter = exports.ddsObject;
exports.Subscriber = exports.ddsObject;
exports.DataReader = exports.ddsObject;
exports.SampleInfo = Struct({
  'sample_state': exports.SampleStateKind,
  'view_state': exports.ViewStateKind,
  'instance_state': exports.InstanceStateKind,
  'disposed_generation_count': ref.types.int32,
  'no_writers_generation_count': ref.types.int32,
  'sample_rank': ref.types.int32,
  'generation_rank': ref.types.int32,
  'absolute_generation_rank': ref.types.int32,
  'source_timestamp': exports.Time_t,
  'instance_handle': exports.InstanceHandle_t,
  'publication_handle': exports.InstanceHandle_t,
  'valid_data': ref.types.bool,
  'reception_timestamp': exports.Time_t
});
exports.SampleInfoSeq = exports.SequenceType(exports.SampleInfo);
exports.ErrorInfoInterface = exports.ddsObject;
exports.DataReaderView = exports.ddsObject;
exports.QosProviderInterface = exports.ddsObject;
exports.Data = exports.ddsObject;
exports.DataSeq = exports.SequenceType(exports.Data);
exports.DataWriter = exports.ddsObject;
exports.DataReader = exports.ddsObject;
exports.WaitSet = exports.WaitSetInterface;
exports.GuardCondition = exports.GuardConditionInterface;
exports.DomainParticipantFactory = exports.DomainParticipantFactoryInterface;
exports.ErrorInfo = exports.ErrorInfoInterface;
exports.QosProvider = exports.QosProviderInterface;
exports.Durability.VOLATILE = 0;
exports.Durability.TRANSIENT_LOCAL = 1;
exports.Durability.TRANSIENT = 2;
exports.Durability.PERSISTENT = 3;
exports.Presentation.INSTANCE = 0;
exports.Presentation.TOPIC = 1;
exports.Presentation.GROUP = 2;
exports.Ownership.SHARED = 0;
exports.Ownership.EXCLUSIVE = 1;
exports.Liveliness.AUTOMATIC = 0;
exports.Liveliness.MANUAL_BY_PARTICIPANT = 1;
exports.Liveliness.MANUAL_BY_TOPIC = 2;
exports.Reliability.BEST_EFFORT = 0;
exports.Reliability.RELIABLE = 1;
exports.DestinationOrder.BY_RECEPTION_TIMESTAMP = 0;
exports.DestinationOrder.BY_SOURCE_TIMESTAMP = 1;
exports.History.KEEP_LAST = 0;
exports.History.KEEP_ALL = 1;
exports.InvalidSampleVisibility.NO_INVALID_SAMPLES = 0;
exports.InvalidSampleVisibility.MINIMUM_INVALID_SAMPLES = 1;
exports.InvalidSampleVisibility.ALL_INVALID_SAMPLES = 2;
exports.SchedulingClass.SCHEDULE_DEFAULT = 0;
exports.SchedulingClass.SCHEDULE_TIMESHARING = 1;
exports.SchedulingClass.SCHEDULE_REALTIME = 2;
exports.SchedulingPriority.PRIORITY_RELATIVE = 0;
exports.SchedulingPriority.PRIORITY_ABSOLUTE = 1;
exports.SampleRejectedStatusKind.NOT_REJECTED = 0;
exports.SampleRejectedStatusKind.REJECTED_BY_INSTANCES_LIMIT = 1;
exports.SampleRejectedStatusKind.REJECTED_BY_SAMPLES_LIMIT = 2;
exports.SampleRejectedStatusKind.REJECTED_BY_SAMPLES_PER_INSTANCE_LIMIT = 3;
exports.XCDR_REPRESENTATION = 0;
exports.XML_REPRESENTATION = 1;
exports.OSPL_REPRESENTATION = 1024;
exports.GPB_REPRESENTATION = 1025;
exports.INVALID_REPRESENTATION = 32767;
exports.HANDLE_NIL = 0;
exports.LENGTH_UNLIMITED = -1;
exports.DURATION_INFINITE_SEC = 2147483647;
exports.DURATION_INFINITE_NSEC = 2147483647;
exports.DURATION_ZERO_SEC = 0;
exports.DURATION_ZERO_NSEC = 0;
exports.TIMESTAMP_INVALID_SEC = -1;
exports.TIMESTAMP_INVALID_NSEC = 4294967295;
exports.DOMAIN_ID_DEFAULT = 2147483647;
exports.DOMAIN_ID_INVALID = -1;
exports.RETCODE_OK = 0;
exports.RETCODE_ERROR = 1;
exports.RETCODE_UNSUPPORTED = 2;
exports.RETCODE_BAD_PARAMETER = 3;
exports.RETCODE_PRECONDITION_NOT_MET = 4;
exports.RETCODE_OUT_OF_RESOURCES = 5;
exports.RETCODE_NOT_ENABLED = 6;
exports.RETCODE_IMMUTABLE_POLICY = 7;
exports.RETCODE_INCONSISTENT_POLICY = 8;
exports.RETCODE_ALREADY_DELETED = 9;
exports.RETCODE_TIMEOUT = 10;
exports.RETCODE_NO_DATA = 11;
exports.RETCODE_ILLEGAL_OPERATION = 12;
exports.ERRORCODE_UNDEFINED = 0;
exports.ERRORCODE_ERROR = 1;
exports.ERRORCODE_OUT_OF_RESOURCES = 2;
exports.ERRORCODE_CREATION_KERNEL_ENTITY_FAILED = 3;
exports.ERRORCODE_INVALID_VALUE = 4;
exports.ERRORCODE_INVALID_DURATION = 5;
exports.ERRORCODE_INVALID_TIME = 6;
exports.ERRORCODE_ENTITY_INUSE = 7;
exports.ERRORCODE_CONTAINS_ENTITIES = 8;
exports.ERRORCODE_ENTITY_UNKNOWN = 9;
exports.ERRORCODE_HANDLE_NOT_REGISTERED = 10;
exports.ERRORCODE_HANDLE_NOT_MATCH = 11;
exports.ERRORCODE_HANDLE_INVALID = 12;
exports.ERRORCODE_INVALID_SEQUENCE = 13;
exports.ERRORCODE_UNSUPPORTED_VALUE = 14;
exports.ERRORCODE_INCONSISTENT_VALUE = 15;
exports.ERRORCODE_IMMUTABLE_QOS_POLICY = 16;
exports.ERRORCODE_INCONSISTENT_QOS = 17;
exports.ERRORCODE_UNSUPPORTED_QOS_POLICY = 18;
exports.ERRORCODE_CONTAINS_CONDITIONS = 19;
exports.ERRORCODE_CONTAINS_LOANS = 20;
exports.ERRORCODE_INCONSISTENT_TOPIC = 21;
exports.INCONSISTENT_TOPIC_STATUS = 1;
exports.OFFERED_DEADLINE_MISSED_STATUS = 2;
exports.REQUESTED_DEADLINE_MISSED_STATUS = 4;
exports.OFFERED_INCOMPATIBLE_QOS_STATUS = 32;
exports.REQUESTED_INCOMPATIBLE_QOS_STATUS = 64;
exports.SAMPLE_LOST_STATUS = 128;
exports.SAMPLE_REJECTED_STATUS = 256;
exports.DATA_ON_READERS_STATUS = 512;
exports.DATA_AVAILABLE_STATUS = 1024;
exports.LIVELINESS_LOST_STATUS = 2048;
exports.LIVELINESS_CHANGED_STATUS = 4096;
exports.PUBLICATION_MATCHED_STATUS = 8192;
exports.SUBSCRIPTION_MATCHED_STATUS = 16384;
exports.ALL_DATA_DISPOSED_TOPIC_STATUS = 2147483648;
exports.READ_SAMPLE_STATE = 1;
exports.NOT_READ_SAMPLE_STATE = 2;
exports.ANY_SAMPLE_STATE = 65535;
exports.NEW_VIEW_STATE = 1;
exports.NOT_NEW_VIEW_STATE = 2;
exports.ANY_VIEW_STATE = 65535;
exports.ALIVE_INSTANCE_STATE = 1;
exports.NOT_ALIVE_DISPOSED_INSTANCE_STATE = 2;
exports.NOT_ALIVE_NO_WRITERS_INSTANCE_STATE = 4;
exports.ANY_INSTANCE_STATE = 65535;
exports.NOT_ALIVE_INSTANCE_STATE = 6;
exports.USERDATA_QOS_POLICY_NAME = "UserData";
exports.DURABILITY_QOS_POLICY_NAME = "Durability";
exports.PRESENTATION_QOS_POLICY_NAME = "Presentation";
exports.DEADLINE_QOS_POLICY_NAME = "Deadline";
exports.LATENCYBUDGET_QOS_POLICY_NAME = "LatencyBudget";
exports.OWNERSHIP_QOS_POLICY_NAME = "Ownership";
exports.OWNERSHIPSTRENGTH_QOS_POLICY_NAME = "OwnershipStrength";
exports.LIVELINESS_QOS_POLICY_NAME = "Liveliness";
exports.TIMEBASEDFILTER_QOS_POLICY_NAME = "TimeBasedFilter";
exports.PARTITION_QOS_POLICY_NAME = "Partition";
exports.RELIABILITY_QOS_POLICY_NAME = "Reliability";
exports.DESTINATIONORDER_QOS_POLICY_NAME = "DestinationOrder";
exports.HISTORY_QOS_POLICY_NAME = "History";
exports.RESOURCELIMITS_QOS_POLICY_NAME = "ResourceLimits";
exports.ENTITYFACTORY_QOS_POLICY_NAME = "EntityFactory";
exports.WRITERDATALIFECYCLE_QOS_POLICY_NAME = "WriterDataLifecycle";
exports.READERDATALIFECYCLE_QOS_POLICY_NAME = "ReaderDataLifecycle";
exports.TOPICDATA_QOS_POLICY_NAME = "TopicData";
exports.GROUPDATA_QOS_POLICY_NAME = "GroupData";
exports.TRANSPORTPRIORITY_QOS_POLICY_NAME = "TransportPriority";
exports.LIFESPAN_QOS_POLICY_NAME = "Lifespan";
exports.DURABILITYSERVICE_QOS_POLICY_NAME = "DurabilityService";
exports.SUBSCRIPTIONKEY_QOS_POLICY_NAME = "SubscriptionKey";
exports.VIEWKEY_QOS_POLICY_NAME = "ViewKey";
exports.READERLIFESPAN_QOS_POLICY_NAME = "ReaderLifespan";
exports.SHARE_QOS_POLICY_NAME = "Share";
exports.SCHEDULING_QOS_POLICY_NAME = "Scheduling";
exports.INVALID_QOS_POLICY_ID = 0;
exports.USERDATA_QOS_POLICY_ID = 1;
exports.DURABILITY_QOS_POLICY_ID = 2;
exports.PRESENTATION_QOS_POLICY_ID = 3;
exports.DEADLINE_QOS_POLICY_ID = 4;
exports.LATENCYBUDGET_QOS_POLICY_ID = 5;
exports.OWNERSHIP_QOS_POLICY_ID = 6;
exports.OWNERSHIPSTRENGTH_QOS_POLICY_ID = 7;
exports.LIVELINESS_QOS_POLICY_ID = 8;
exports.TIMEBASEDFILTER_QOS_POLICY_ID = 9;
exports.PARTITION_QOS_POLICY_ID = 10;
exports.RELIABILITY_QOS_POLICY_ID = 11;
exports.DESTINATIONORDER_QOS_POLICY_ID = 12;
exports.HISTORY_QOS_POLICY_ID = 13;
exports.RESOURCELIMITS_QOS_POLICY_ID = 14;
exports.ENTITYFACTORY_QOS_POLICY_ID = 15;
exports.WRITERDATALIFECYCLE_QOS_POLICY_ID = 16;
exports.READERDATALIFECYCLE_QOS_POLICY_ID = 17;
exports.TOPICDATA_QOS_POLICY_ID = 18;
exports.GROUPDATA_QOS_POLICY_ID = 19;
exports.TRANSPORTPRIORITY_QOS_POLICY_ID = 20;
exports.LIFESPAN_QOS_POLICY_ID = 21;
exports.DURABILITYSERVICE_QOS_POLICY_ID = 22;
exports.SUBSCRIPTIONKEY_QOS_POLICY_ID = 23;
exports.VIEWKEY_QOS_POLICY_ID = 24;
exports.READERLIFESPAN_QOS_POLICY_ID = 25;
exports.SHARE_QOS_POLICY_ID = 26;
exports.SCHEDULING_QOS_POLICY_ID = 27;
exports.default_domain_id = 2147483647;
var raw = FFI.Library('/Users/erik/PrismTech/ospli/lib/x86_64.darwin10_clang-release/libdcpssac.dylib', {
  'DDS_Condition_get_trigger_value': [ ref.types.bool, [ exports.Condition ] ],
  'DDS_WaitSet__alloc': [ exports.WaitSet, [ ] ],
  'DDS_WaitSet_wait': [ exports.ReturnCode_t, [ exports.WaitSet, ref.refType(exports.ConditionSeq), ref.refType(exports.Duration_t) ] ],
  'DDS_WaitSet_attach_condition': [ exports.ReturnCode_t, [ exports.WaitSet, exports.Condition ] ],
  'DDS_WaitSet_detach_condition': [ exports.ReturnCode_t, [ exports.WaitSet, exports.Condition ] ],
  'DDS_WaitSet_get_conditions': [ exports.ReturnCode_t, [ exports.WaitSet, ref.refType(exports.ConditionSeq) ] ],
  'DDS_GuardCondition__alloc': [ exports.GuardCondition, [ ] ],
  'DDS_GuardCondition_set_trigger_value': [ exports.ReturnCode_t, [ exports.GuardCondition, ref.types.bool ] ],
  'DDS_StatusCondition_get_enabled_statuses': [ exports.StatusMask, [ exports.StatusCondition ] ],
  'DDS_StatusCondition_set_enabled_statuses': [ exports.ReturnCode_t, [ exports.StatusCondition, exports.StatusMask ] ],
  'DDS_StatusCondition_get_entity': [ exports.Entity, [ exports.StatusCondition ] ],
  'DDS_ReadCondition_get_sample_state_mask': [ exports.SampleStateMask, [ exports.ReadCondition ] ],
  'DDS_ReadCondition_get_view_state_mask': [ exports.ViewStateMask, [ exports.ReadCondition ] ],
  'DDS_ReadCondition_get_instance_state_mask': [ exports.InstanceStateMask, [ exports.ReadCondition ] ],
  'DDS_ReadCondition_get_datareader': [ exports.DataReader, [ exports.ReadCondition ] ],
  'DDS_ReadCondition_get_datareaderview': [ exports.DataReaderView, [ exports.ReadCondition ] ],
  'DDS_QueryCondition_get_query_expression': [ ref.types.CString, [ exports.QueryCondition ] ],
  'DDS_QueryCondition_get_query_parameters': [ exports.ReturnCode_t, [ exports.QueryCondition, ref.refType(exports.StringSeq) ] ],
  'DDS_QueryCondition_set_query_parameters': [ exports.ReturnCode_t, [ exports.QueryCondition, ref.refType(exports.StringSeq) ] ],
  'DDS_Entity_enable': [ exports.ReturnCode_t, [ exports.Entity ] ],
  'DDS_Entity_get_statuscondition': [ exports.StatusCondition, [ exports.Entity ] ],
  'DDS_Entity_get_status_changes': [ exports.StatusMask, [ exports.Entity ] ],
  'DDS_Entity_get_instance_handle': [ exports.InstanceHandle_t, [ exports.Entity ] ],
  'DDS_DomainParticipant_create_publisher': [ exports.Publisher, [ exports.DomainParticipant, ref.refType(exports.PublisherQos), exports.PublisherListener, exports.StatusMask ] ],
  'DDS_DomainParticipant_delete_publisher': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.Publisher ] ],
  'DDS_DomainParticipant_create_subscriber': [ exports.Subscriber, [ exports.DomainParticipant, ref.refType(exports.SubscriberQos), exports.SubscriberListener, exports.StatusMask ] ],
  'DDS_DomainParticipant_delete_subscriber': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.Subscriber ] ],
  'DDS_DomainParticipant_get_builtin_subscriber': [ exports.Subscriber, [ exports.DomainParticipant ] ],
  'DDS_DomainParticipant_create_topic': [ exports.Topic, [ exports.DomainParticipant, ref.types.CString, ref.types.CString, ref.refType(exports.TopicQos), exports.TopicListener, exports.StatusMask ] ],
  'DDS_DomainParticipant_delete_topic': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.Topic ] ],
  'DDS_DomainParticipant_find_topic': [ exports.Topic, [ exports.DomainParticipant, ref.types.CString, ref.refType(exports.Duration_t) ] ],
  'DDS_DomainParticipant_lookup_topicdescription': [ exports.TopicDescription, [ exports.DomainParticipant, ref.types.CString ] ],
  'DDS_DomainParticipant_create_contentfilteredtopic': [ exports.ContentFilteredTopic, [ exports.DomainParticipant, ref.types.CString, exports.Topic, ref.types.CString, ref.refType(exports.StringSeq) ] ],
  'DDS_DomainParticipant_delete_contentfilteredtopic': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.ContentFilteredTopic ] ],
  'DDS_DomainParticipant_create_multitopic': [ exports.MultiTopic, [ exports.DomainParticipant, ref.types.CString, ref.types.CString, ref.types.CString, ref.refType(exports.StringSeq) ] ],
  'DDS_DomainParticipant_delete_multitopic': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.MultiTopic ] ],
  'DDS_DomainParticipant_delete_contained_entities': [ exports.ReturnCode_t, [ exports.DomainParticipant ] ],
  'DDS_DomainParticipant_set_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.DomainParticipantQos) ] ],
  'DDS_DomainParticipant_get_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.DomainParticipantQos) ] ],
  'DDS_DomainParticipant_set_listener': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.DomainParticipantListener, exports.StatusMask ] ],
  'DDS_DomainParticipant_get_listener': [ exports.DomainParticipantListener, [ exports.DomainParticipant ] ],
  'DDS_DomainParticipant_ignore_participant': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_ignore_topic': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_ignore_publication': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_ignore_subscription': [ exports.ReturnCode_t, [ exports.DomainParticipant, exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_get_domain_id': [ exports.DomainId_t, [ exports.DomainParticipant ] ],
  'DDS_DomainParticipant_assert_liveliness': [ exports.ReturnCode_t, [ exports.DomainParticipant ] ],
  'DDS_DomainParticipant_set_default_publisher_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.PublisherQos) ] ],
  'DDS_DomainParticipant_get_default_publisher_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.PublisherQos) ] ],
  'DDS_DomainParticipant_set_default_subscriber_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.SubscriberQos) ] ],
  'DDS_DomainParticipant_get_default_subscriber_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.SubscriberQos) ] ],
  'DDS_DomainParticipant_set_default_topic_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.TopicQos) ] ],
  'DDS_DomainParticipant_get_default_topic_qos': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.TopicQos) ] ],
  'DDS_DomainParticipant_get_discovered_participants': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.InstanceHandleSeq) ] ],
  'DDS_DomainParticipant_get_discovered_participant_data': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.ParticipantBuiltinTopicData), exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_get_discovered_topics': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.InstanceHandleSeq) ] ],
  'DDS_DomainParticipant_get_discovered_topic_data': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.TopicBuiltinTopicData), exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_contains_entity': [ ref.types.bool, [ exports.DomainParticipant, exports.InstanceHandle_t ] ],
  'DDS_DomainParticipant_get_current_time': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.refType(exports.Time_t) ] ],
  'DDS_DomainParticipant_delete_historical_data': [ exports.ReturnCode_t, [ exports.DomainParticipant, ref.types.CString, ref.types.CString ] ],
  'DDS_Domain_create_persistent_snapshot': [ exports.ReturnCode_t, [ exports.Domain, ref.types.CString, ref.types.CString, ref.types.CString ] ],
  'DDS_DomainParticipantFactory_create_participant': [ exports.DomainParticipant, [ exports.DomainParticipantFactory, exports.DomainId_t, ref.refType(exports.DomainParticipantQos), exports.DomainParticipantListener, exports.StatusMask ] ],
  'DDS_DomainParticipantFactory_delete_participant': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, exports.DomainParticipant ] ],
  'DDS_DomainParticipantFactory_lookup_participant': [ exports.DomainParticipant, [ exports.DomainParticipantFactory, exports.DomainId_t ] ],
  'DDS_DomainParticipantFactory_set_default_participant_qos': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, ref.refType(exports.DomainParticipantQos) ] ],
  'DDS_DomainParticipantFactory_get_default_participant_qos': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, ref.refType(exports.DomainParticipantQos) ] ],
  'DDS_DomainParticipantFactory_set_qos': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, ref.refType(exports.DomainParticipantFactoryQos) ] ],
  'DDS_DomainParticipantFactory_get_qos': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, ref.refType(exports.DomainParticipantFactoryQos) ] ],
  'DDS_DomainParticipantFactory_lookup_domain': [ exports.Domain, [ exports.DomainParticipantFactory, exports.DomainId_t ] ],
  'DDS_DomainParticipantFactory_delete_domain': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, exports.Domain ] ],
  'DDS_DomainParticipantFactory_delete_contained_entities': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory ] ],
  'DDS_DomainParticipantFactory_detach_all_domains': [ exports.ReturnCode_t, [ exports.DomainParticipantFactory, ref.types.bool, ref.types.bool ] ],
  'DDS_TypeSupport_register_type': [ exports.ReturnCode_t, [ exports.TypeSupport, exports.DomainParticipant, ref.types.CString ] ],
  'DDS_TypeSupport_get_type_name': [ ref.types.CString, [ exports.TypeSupport ] ],
  'DDS_TopicDescription_get_name': [ ref.types.CString, [ exports.TopicDescription ] ],
  'DDS_TopicDescription_get_type_name': [ ref.types.CString, [ exports.TopicDescription ] ],
  'DDS_TopicDescription_get_participant': [ exports.DomainParticipant, [ exports.TopicDescription ] ],
  'DDS_Topic_get_inconsistent_topic_status': [ exports.ReturnCode_t, [ exports.Topic, ref.refType(exports.InconsistentTopicStatus) ] ],
  'DDS_Topic_get_qos': [ exports.ReturnCode_t, [ exports.Topic, ref.refType(exports.TopicQos) ] ],
  'DDS_Topic_set_qos': [ exports.ReturnCode_t, [ exports.Topic, ref.refType(exports.TopicQos) ] ],
  'DDS_Topic_get_listener': [ exports.TopicListener, [ exports.Topic ] ],
  'DDS_Topic_set_listener': [ exports.ReturnCode_t, [ exports.Topic, exports.TopicListener, exports.StatusMask ] ],
  'DDS_Topic_dispose_all_data': [ exports.ReturnCode_t, [ exports.Topic ] ],
  'DDS_ContentFilteredTopic_get_filter_expression': [ ref.types.CString, [ exports.ContentFilteredTopic ] ],
  'DDS_ContentFilteredTopic_get_expression_parameters': [ exports.ReturnCode_t, [ exports.ContentFilteredTopic, ref.refType(exports.StringSeq) ] ],
  'DDS_ContentFilteredTopic_set_expression_parameters': [ exports.ReturnCode_t, [ exports.ContentFilteredTopic, ref.refType(exports.StringSeq) ] ],
  'DDS_ContentFilteredTopic_get_related_topic': [ exports.Topic, [ exports.ContentFilteredTopic ] ],
  'DDS_MultiTopic_get_subscription_expression': [ ref.types.CString, [ exports.MultiTopic ] ],
  'DDS_MultiTopic_get_expression_parameters': [ exports.ReturnCode_t, [ exports.MultiTopic, ref.refType(exports.StringSeq) ] ],
  'DDS_MultiTopic_set_expression_parameters': [ exports.ReturnCode_t, [ exports.MultiTopic, ref.refType(exports.StringSeq) ] ],
  'DDS_Publisher_create_datawriter': [ exports.DataWriter, [ exports.Publisher, exports.Topic, ref.refType(exports.DataWriterQos), exports.DataWriterListener, exports.StatusMask ] ],
  'DDS_Publisher_delete_datawriter': [ exports.ReturnCode_t, [ exports.Publisher, exports.DataWriter ] ],
  'DDS_Publisher_lookup_datawriter': [ exports.DataWriter, [ exports.Publisher, ref.types.CString ] ],
  'DDS_Publisher_delete_contained_entities': [ exports.ReturnCode_t, [ exports.Publisher ] ],
  'DDS_Publisher_set_qos': [ exports.ReturnCode_t, [ exports.Publisher, ref.refType(exports.PublisherQos) ] ],
  'DDS_Publisher_get_qos': [ exports.ReturnCode_t, [ exports.Publisher, ref.refType(exports.PublisherQos) ] ],
  'DDS_Publisher_set_listener': [ exports.ReturnCode_t, [ exports.Publisher, exports.PublisherListener, exports.StatusMask ] ],
  'DDS_Publisher_get_listener': [ exports.PublisherListener, [ exports.Publisher ] ],
  'DDS_Publisher_suspend_publications': [ exports.ReturnCode_t, [ exports.Publisher ] ],
  'DDS_Publisher_resume_publications': [ exports.ReturnCode_t, [ exports.Publisher ] ],
  'DDS_Publisher_begin_coherent_changes': [ exports.ReturnCode_t, [ exports.Publisher ] ],
  'DDS_Publisher_end_coherent_changes': [ exports.ReturnCode_t, [ exports.Publisher ] ],
  'DDS_Publisher_wait_for_acknowledgments': [ exports.ReturnCode_t, [ exports.Publisher, ref.refType(exports.Duration_t) ] ],
  'DDS_Publisher_get_participant': [ exports.DomainParticipant, [ exports.Publisher ] ],
  'DDS_Publisher_set_default_datawriter_qos': [ exports.ReturnCode_t, [ exports.Publisher, ref.refType(exports.DataWriterQos) ] ],
  'DDS_Publisher_get_default_datawriter_qos': [ exports.ReturnCode_t, [ exports.Publisher, ref.refType(exports.DataWriterQos) ] ],
  'DDS_Publisher_copy_from_topic_qos': [ exports.ReturnCode_t, [ exports.Publisher, ref.refType(exports.DataWriterQos), ref.refType(exports.TopicQos) ] ],
  'DDS_DataWriter_set_qos': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.DataWriterQos) ] ],
  'DDS_DataWriter_get_qos': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.DataWriterQos) ] ],
  'DDS_DataWriter_set_listener': [ exports.ReturnCode_t, [ exports.DataWriter, exports.DataWriterListener, exports.StatusMask ] ],
  'DDS_DataWriter_get_listener': [ exports.DataWriterListener, [ exports.DataWriter ] ],
  'DDS_DataWriter_get_topic': [ exports.Topic, [ exports.DataWriter ] ],
  'DDS_DataWriter_get_publisher': [ exports.Publisher, [ exports.DataWriter ] ],
  'DDS_DataWriter_wait_for_acknowledgments': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.Duration_t) ] ],
  'DDS_DataWriter_get_liveliness_lost_status': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.LivelinessLostStatus) ] ],
  'DDS_DataWriter_get_offered_deadline_missed_status': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.OfferedDeadlineMissedStatus) ] ],
  'DDS_DataWriter_get_offered_incompatible_qos_status': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.OfferedIncompatibleQosStatus) ] ],
  'DDS_DataWriter_get_publication_matched_status': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.PublicationMatchedStatus) ] ],
  'DDS_DataWriter_assert_liveliness': [ exports.ReturnCode_t, [ exports.DataWriter ] ],
  'DDS_DataWriter_get_matched_subscriptions': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.InstanceHandleSeq) ] ],
  'DDS_DataWriter_get_matched_subscription_data': [ exports.ReturnCode_t, [ exports.DataWriter, ref.refType(exports.SubscriptionBuiltinTopicData), exports.InstanceHandle_t ] ],
  'DDS_DataWriter_register_instance': [ exports.InstanceHandle_t, [ exports.DataWriter, exports.Data ] ],
  'DDS_DataWriter_register_instance_w_timestamp': [ exports.InstanceHandle_t, [ exports.DataWriter, exports.Data, ref.refType(exports.Time_t) ] ],
  'DDS_DataWriter_unregister_instance': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t ] ],
  'DDS_DataWriter_unregister_instance_w_timestamp': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t, ref.refType(exports.Time_t) ] ],
  'DDS_DataWriter_write': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t ] ],
  'DDS_DataWriter_write_w_timestamp': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t, ref.refType(exports.Time_t) ] ],
  'DDS_DataWriter_dispose': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t ] ],
  'DDS_DataWriter_dispose_w_timestamp': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t, ref.refType(exports.Time_t) ] ],
  'DDS_DataWriter_get_key_value': [ exports.ReturnCode_t, [ exports.DataWriter, exports.Data, exports.InstanceHandle_t ] ],
  'DDS_DataWriter_lookup_instance': [ exports.InstanceHandle_t, [ exports.DataWriter, exports.Data ] ],
  'DDS_Subscriber_create_datareader': [ exports.DataReader, [ exports.Subscriber, exports.TopicDescription, ref.refType(exports.DataReaderQos), exports.DataReaderListener, exports.StatusMask ] ],
  'DDS_Subscriber_delete_datareader': [ exports.ReturnCode_t, [ exports.Subscriber, exports.DataReader ] ],
  'DDS_Subscriber_delete_contained_entities': [ exports.ReturnCode_t, [ exports.Subscriber ] ],
  'DDS_Subscriber_lookup_datareader': [ exports.DataReader, [ exports.Subscriber, ref.types.CString ] ],
  'DDS_Subscriber_get_datareaders': [ exports.ReturnCode_t, [ exports.Subscriber, ref.refType(exports.DataReaderSeq), exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_Subscriber_notify_datareaders': [ exports.ReturnCode_t, [ exports.Subscriber ] ],
  'DDS_Subscriber_set_qos': [ exports.ReturnCode_t, [ exports.Subscriber, ref.refType(exports.SubscriberQos) ] ],
  'DDS_Subscriber_get_qos': [ exports.ReturnCode_t, [ exports.Subscriber, ref.refType(exports.SubscriberQos) ] ],
  'DDS_Subscriber_set_listener': [ exports.ReturnCode_t, [ exports.Subscriber, exports.SubscriberListener, exports.StatusMask ] ],
  'DDS_Subscriber_get_listener': [ exports.SubscriberListener, [ exports.Subscriber ] ],
  'DDS_Subscriber_begin_access': [ exports.ReturnCode_t, [ exports.Subscriber ] ],
  'DDS_Subscriber_end_access': [ exports.ReturnCode_t, [ exports.Subscriber ] ],
  'DDS_Subscriber_get_participant': [ exports.DomainParticipant, [ exports.Subscriber ] ],
  'DDS_Subscriber_set_default_datareader_qos': [ exports.ReturnCode_t, [ exports.Subscriber, ref.refType(exports.DataReaderQos) ] ],
  'DDS_Subscriber_get_default_datareader_qos': [ exports.ReturnCode_t, [ exports.Subscriber, ref.refType(exports.DataReaderQos) ] ],
  'DDS_Subscriber_copy_from_topic_qos': [ exports.ReturnCode_t, [ exports.Subscriber, ref.refType(exports.DataReaderQos), ref.refType(exports.TopicQos) ] ],
  'DDS_DataReader_create_readcondition': [ exports.ReadCondition, [ exports.DataReader, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_create_querycondition': [ exports.QueryCondition, [ exports.DataReader, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask, ref.types.CString, ref.refType(exports.StringSeq) ] ],
  'DDS_DataReader_delete_readcondition': [ exports.ReturnCode_t, [ exports.DataReader, exports.ReadCondition ] ],
  'DDS_DataReader_delete_contained_entities': [ exports.ReturnCode_t, [ exports.DataReader ] ],
  'DDS_DataReader_set_qos': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataReaderQos) ] ],
  'DDS_DataReader_get_qos': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataReaderQos) ] ],
  'DDS_DataReader_set_listener': [ exports.ReturnCode_t, [ exports.DataReader, exports.DataReaderListener, exports.StatusMask ] ],
  'DDS_DataReader_get_listener': [ exports.DataReaderListener, [ exports.DataReader ] ],
  'DDS_DataReader_get_topicdescription': [ exports.TopicDescription, [ exports.DataReader ] ],
  'DDS_DataReader_get_subscriber': [ exports.Subscriber, [ exports.DataReader ] ],
  'DDS_DataReader_get_sample_rejected_status': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.SampleRejectedStatus) ] ],
  'DDS_DataReader_get_liveliness_changed_status': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.LivelinessChangedStatus) ] ],
  'DDS_DataReader_get_requested_deadline_missed_status': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.RequestedDeadlineMissedStatus) ] ],
  'DDS_DataReader_get_requested_incompatible_qos_status': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.RequestedIncompatibleQosStatus) ] ],
  'DDS_DataReader_get_subscription_matched_status': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.SubscriptionMatchedStatus) ] ],
  'DDS_DataReader_get_sample_lost_status': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.SampleLostStatus) ] ],
  'DDS_DataReader_wait_for_historical_data': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.Duration_t) ] ],
  'DDS_DataReader_wait_for_historical_data_w_condition': [ exports.ReturnCode_t, [ exports.DataReader, ref.types.CString, ref.refType(exports.StringSeq), ref.refType(exports.Time_t), ref.refType(exports.Time_t), ref.refType(exports.ResourceLimits), ref.refType(exports.Duration_t) ] ],
  'DDS_DataReader_get_matched_publications': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.InstanceHandleSeq) ] ],
  'DDS_DataReader_get_matched_publication_data': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.PublicationBuiltinTopicData), exports.InstanceHandle_t ] ],
  'DDS_DataReader_create_view': [ exports.DataReaderView, [ exports.DataReader, ref.refType(exports.DataReaderViewQos) ] ],
  'DDS_DataReader_delete_view': [ exports.ReturnCode_t, [ exports.DataReader, exports.DataReaderView ] ],
  'DDS_DataReader_set_default_datareaderview_qos': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataReaderViewQos) ] ],
  'DDS_DataReader_get_default_datareaderview_qos': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataReaderViewQos) ] ],
  'DDS_DataReader_read': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_take': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_read_w_condition': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.ReadCondition ] ],
  'DDS_DataReader_take_w_condition': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.ReadCondition ] ],
  'DDS_DataReader_read_next_sample': [ exports.ReturnCode_t, [ exports.DataReader, exports.Data, ref.refType(exports.SampleInfo) ] ],
  'DDS_DataReader_take_next_sample': [ exports.ReturnCode_t, [ exports.DataReader, exports.Data, ref.refType(exports.SampleInfo) ] ],
  'DDS_DataReader_read_instance': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.InstanceHandle_t, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_take_instance': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.InstanceHandle_t, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_read_next_instance': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.InstanceHandle_t, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_take_next_instance': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.InstanceHandle_t, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReader_read_next_instance_w_condition': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.InstanceHandle_t, exports.ReadCondition ] ],
  'DDS_DataReader_take_next_instance_w_condition': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq), ref.types.int32, exports.InstanceHandle_t, exports.ReadCondition ] ],
  'DDS_DataReader_return_loan': [ exports.ReturnCode_t, [ exports.DataReader, ref.refType(exports.DataSeq), ref.refType(exports.SampleInfoSeq) ] ],
  'DDS_DataReader_get_key_value': [ exports.ReturnCode_t, [ exports.DataReader, exports.Data, exports.InstanceHandle_t ] ],
  'DDS_DataReader_lookup_instance': [ exports.InstanceHandle_t, [ exports.DataReader, exports.Data ] ],
  'DDS_ErrorInfo__alloc': [ exports.ErrorInfo, [ ] ],
  'DDS_ErrorInfo_update': [ exports.ReturnCode_t, [ exports.ErrorInfo ] ],
  'DDS_ErrorInfo_get_code': [ exports.ReturnCode_t, [ exports.ErrorInfo, exports.ReturnCode_t ] ],
  'DDS_ErrorInfo_get_message': [ exports.ReturnCode_t, [ exports.ErrorInfo, ref.types.CString ] ],
  'DDS_ErrorInfo_get_location': [ exports.ReturnCode_t, [ exports.ErrorInfo, ref.types.CString ] ],
  'DDS_ErrorInfo_get_source_line': [ exports.ReturnCode_t, [ exports.ErrorInfo, ref.types.CString ] ],
  'DDS_ErrorInfo_get_stack_trace': [ exports.ReturnCode_t, [ exports.ErrorInfo, ref.types.CString ] ],
  'DDS_DataReaderView_create_readcondition': [ exports.ReadCondition, [ exports.DataReaderView, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask ] ],
  'DDS_DataReaderView_create_querycondition': [ exports.QueryCondition, [ exports.DataReaderView, exports.SampleStateMask, exports.ViewStateMask, exports.InstanceStateMask, ref.types.CString, ref.refType(exports.StringSeq) ] ],
  'DDS_DataReaderView_delete_readcondition': [ exports.ReturnCode_t, [ exports.DataReaderView, exports.ReadCondition ] ],
  'DDS_DataReaderView_delete_contained_entities': [ exports.ReturnCode_t, [ exports.DataReaderView ] ],
  'DDS_DataReaderView_set_qos': [ exports.ReturnCode_t, [ exports.DataReaderView, ref.refType(exports.DataReaderViewQos) ] ],
  'DDS_DataReaderView_get_qos': [ exports.ReturnCode_t, [ exports.DataReaderView, ref.refType(exports.DataReaderViewQos) ] ],
  'DDS_DataReaderView_get_datareader': [ exports.DataReader, [ exports.DataReaderView ] ],
  'DDS_QosProvider__alloc': [ exports.QosProvider, [ ] ],
  'DDS_QosProvider_get_participant_qos': [ exports.ReturnCode_t, [ exports.QosProvider, ref.refType(exports.DomainParticipantQos), ref.types.CString ] ],
  'DDS_QosProvider_get_topic_qos': [ exports.ReturnCode_t, [ exports.QosProvider, ref.refType(exports.TopicQos), ref.types.CString ] ],
  'DDS_QosProvider_get_subscriber_qos': [ exports.ReturnCode_t, [ exports.QosProvider, ref.refType(exports.SubscriberQos), ref.types.CString ] ],
  'DDS_QosProvider_get_datareader_qos': [ exports.ReturnCode_t, [ exports.QosProvider, ref.refType(exports.DataReaderQos), ref.types.CString ] ],
  'DDS_QosProvider_get_publisher_qos': [ exports.ReturnCode_t, [ exports.QosProvider, ref.refType(exports.PublisherQos), ref.types.CString ] ],
  'DDS_QosProvider_get_datawriter_qos': [ exports.ReturnCode_t, [ exports.QosProvider, ref.refType(exports.DataWriterQos), ref.types.CString ] ],
  'DDS_octSeq__alloc': [ ref.refType(exports.octSeq), [ ] ],
  'DDS_octSeq_allocbuf': [ ref.refType(ref.types.uint8), [ ] ],
  'DDS_StringSeq__alloc': [ ref.refType(exports.StringSeq), [ ] ],
  'DDS_StringSeq_allocbuf': [ ref.refType(ref.types.CString), [ ] ],
  'DDS_DataReaderViewQos__alloc': [ ref.refType(exports.DataReaderViewQos), [ ] ],
  'DDS_DomainParticipantFactoryQos__alloc': [ ref.refType(exports.DomainParticipantFactoryQos), [ ] ],
  'DDS_DomainParticipantQos__alloc': [ ref.refType(exports.DomainParticipantQos), [ ] ],
  'DDS_TopicQos__alloc': [ ref.refType(exports.TopicQos), [ ] ],
  'DDS_DataWriterQos__alloc': [ ref.refType(exports.DataWriterQos), [ ] ],
  'DDS_PublisherQos__alloc': [ ref.refType(exports.PublisherQos), [ ] ],
  'DDS_DataReaderQos__alloc': [ ref.refType(exports.DataReaderQos), [ ] ],
  'DDS_SubscriberQos__alloc': [ ref.refType(exports.SubscriberQos), [ ] ],
  'DDS_InstanceHandleSeq__alloc': [ ref.refType(exports.InstanceHandleSeq), [ ] ],
  'DDS_InstanceHandleSeq_allocbuf': [ ref.refType(exports.InstanceHandle_t), [ ] ],
  'DDS_QosPolicyCountSeq__alloc': [ ref.refType(exports.QosPolicyCountSeq), [ ] ],
  'DDS_QosPolicyCountSeq_allocbuf': [ ref.refType(ref.refType(exports.QosPolicyCount)), [ ] ],
  'DDS_TopicSeq__alloc': [ ref.refType(exports.TopicSeq), [ ] ],
  'DDS_TopicSeq_allocbuf': [ ref.refType(exports.Topic), [ ] ],
  'DDS_DataReaderSeq__alloc': [ ref.refType(exports.DataReaderSeq), [ ] ],
  'DDS_DataReaderSeq_allocbuf': [ ref.refType(exports.DataReader), [ ] ],
  'DDS_ConditionSeq__alloc': [ ref.refType(exports.ConditionSeq), [ ] ],
  'DDS_ConditionSeq_allocbuf': [ ref.refType(exports.Condition), [ ] ],
  'DDS_SampleStateSeq__alloc': [ ref.refType(exports.SampleStateSeq), [ ] ],
  'DDS_SampleStateSeq_allocbuf': [ ref.refType(exports.SampleStateKind), [ ] ],
  'DDS_ViewStateSeq__alloc': [ ref.refType(exports.ViewStateSeq), [ ] ],
  'DDS_ViewStateSeq_allocbuf': [ ref.refType(exports.ViewStateKind), [ ] ],
  'DDS_InstanceStateSeq__alloc': [ ref.refType(exports.InstanceStateSeq), [ ] ],
  'DDS_InstanceStateSeq_allocbuf': [ ref.refType(exports.InstanceStateKind), [ ] ],
  'DDS_SampleInfoSeq__alloc': [ ref.refType(exports.SampleInfoSeq), [ ] ],
  'DDS_SampleInfoSeq_allocbuf': [ ref.refType(ref.refType(exports.SampleInfo)), [ ] ],
  'DDS_DomainParticipantFactory_get_instance': [ exports.DomainParticipantFactory, [] ],
  'DDS_TypeSupport__alloc': [ exports.TypeSupport, [ ref.types.CString, ref.types.CString, ref.types.CString ] ],
  'DDS_free': [ ref.types.void, [ ref.refType(ref.types.void) ] ],
});
for (var attrname in raw) {
  exports[attrname.replace(/^DDS_/, "")] = raw[attrname];
}
