Note: only tried it with node.js v5.9.0 on MacOS X

Required packages:

ffi
ref
ref-struct
ref-array
sleep (for test.js, publisher.js)

You'll need to edit "dds.js", which currently has a hardcoded path to the DCPS C library.

For regenerating the binding, you need perl (any moderately recent 5.x
version will do), plus access to ospli/etc/idl/dds_dcps.idl and the files
it includes (i.e., you need to OpenSplice sources).  The command to do
it is:

perl ./idl2js -o dds.js $(OSPL_HOME)/etc/idl/dds_dcps.idl genericops.idl

node dds.js should terminate without any messages (it just loads the library).

test.js publishes a red and a blue circle at 1Hz and reads them back,
printing what it receives.

publisher.js & subscriber.js are a javascript re-implementation of the
standard throughput example, though without all the options.
