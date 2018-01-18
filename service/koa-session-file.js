// FileStore use flat-cache for koa-session
/* 
Every session key will generate a file in the cacheDir, so maybe you will clean the old files after some days.
You can make a timed task of shell script to clean them (e.g. delete files that last update is before 30 days).
some example, for reference only:

/root/soft_shell/clean-cache.sh:
#!/bin/sh
find /app/cacheDir/ -mtime +30 -name "*.*" -exec rm -Rf {} \;

crontab:
crontab -l
10 4 1 * * /bin/sh /root/soft_shell/clean-cache.sh
*/

const debug = require('debug')('koa-session-file');
const flatCache = require('flat-cache');

module.exports = class FileStore {
  constructor(opts={}) {
    this.cacheDir = opts.cacheDir;
    this.maxAge = opts.maxAge || 86400000; //ms, 1 day

  }

  get(key, maxAge, { rolling }) {
    let cache = flatCache.load(key, this.cacheDir);
    let data = cache.getKey(key);
    // no session
    if (!data || !data.session){
      debug('get data from file is NULL, key=%s', key)
      return null;
    }
    // session expired
    //if (data.expired < Date.now() + (maxAge || 0)) return null;
    // session
    return data.session;
  }

  set(key, sess, maxAge, { rolling, changed }) {
    let cache = flatCache.load(key, this.cacheDir);
    let data = {};

    data.session = sess;
    data.expired = Date.now() + (maxAge || this.maxAge);
    cache.setKey(key, data);
    cache.save();
  }

  destroy(key) {
    flatCache.clearCacheById(key);
  }
}