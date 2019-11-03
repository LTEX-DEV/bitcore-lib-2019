'use strict';

var auroracoin = module.exports;

// module information
auroracoin.version = 'v' + require('./package.json').version;
auroracoin.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of auroracoin found. ' +
      'Please make sure to require auroracoin and check that submodules do' +
      ' not also include their own auroracoin dependency.';
    throw new Error(message);
  }
};
auroracoin.versionGuard(global._auroracoin);
global._auroracoin = auroracoin.version;

// crypto
auroracoin.crypto = {};
auroracoin.crypto.BN = require('./lib/crypto/bn');
auroracoin.crypto.ECDSA = require('./lib/crypto/ecdsa');
auroracoin.crypto.Hash = require('./lib/crypto/hash');
auroracoin.crypto.Random = require('./lib/crypto/random');
auroracoin.crypto.Point = require('./lib/crypto/point');
auroracoin.crypto.Signature = require('./lib/crypto/signature');

// encoding
auroracoin.encoding = {};
auroracoin.encoding.bech32 = require('./lib/encoding/bech32');
auroracoin.encoding.bech32Check = require('./lib/encoding/bech32check');
auroracoin.encoding.Base58 = require('./lib/encoding/base58');
auroracoin.encoding.Base58Check = require('./lib/encoding/base58check');
auroracoin.encoding.BufferReader = require('./lib/encoding/bufferreader');
auroracoin.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
auroracoin.encoding.Varint = require('./lib/encoding/varint');

// utilities
auroracoin.util = {};
auroracoin.util.assets = require('./lib/util/assets');
auroracoin.util.buffer = require('./lib/util/buffer');
auroracoin.util.js = require('./lib/util/js');
auroracoin.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
auroracoin.errors = require('./lib/errors');

// main auroracoin library
auroracoin.Asset = require('./lib/asset');
auroracoin.Address = require('./lib/address');
auroracoin.Block = require('./lib/block');
auroracoin.MerkleBlock = require('./lib/block/merkleblock');
auroracoin.BlockHeader = require('./lib/block/blockheader');
auroracoin.HDPrivateKey = require('./lib/hdprivatekey.js');
auroracoin.HDPublicKey = require('./lib/hdpublickey.js');
auroracoin.Networks = require('./lib/networks');
auroracoin.Opcode = require('./lib/opcode');
auroracoin.PrivateKey = require('./lib/privatekey');
auroracoin.PublicKey = require('./lib/publickey');
auroracoin.Script = require('./lib/script');
auroracoin.Transaction = require('./lib/transaction');
auroracoin.URI = require('./lib/uri');
auroracoin.Unit = require('./lib/unit');

// dependencies, subject to change
auroracoin.deps = {};
auroracoin.deps.bnjs = require('bn.js');
auroracoin.deps.bs58 = require('bs58');
auroracoin.deps.Buffer = Buffer;
auroracoin.deps.elliptic = require('elliptic');
auroracoin.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
auroracoin.Transaction.sighash = require('./lib/transaction/sighash');
