/**
 * Testing
 * @ndaidong
 */

var test = require('tape');
var debug = require('debug');
var error = debug('artparser:error');

var {
  hasProperty,
  isString,
  isObject,
  isArray,
  isNumber
} = require('bellajs');

var {
  extract
} = require('../../../');

var hasRequiredKeys = (o) => {
  var structure = [
    'alias',
    'url',
    'canonicals',
    'title',
    'description',
    'image',
    'content',
    'author',
    'source',
    'domain',
    'duration',
    'publishedTime'
  ];

  return structure.every((k) => {
    return hasProperty(o, k);
  });
};

(() => {

  let url = `https://www.youtube.com/watch?v=dIiwFzFvsmw`;

  test(`Testing with .extract(${url})`, (t) => {

    extract(url).then((art) => {
      t.comment('(Call returned result is R, so:)');
      t.ok(isObject(art), 'R must be an object.');
      t.ok(hasRequiredKeys(art), 'R must have all required keys.');
      t.ok(isString(art.alias), 'R.alias must be a string.');
      t.ok(isString(art.url), 'R.url must be a string.');
      t.ok(art.url.length > 0, 'R.url is not empty.');
      t.ok(isArray(art.canonicals), 'R.canonicals must be an array.');
      t.ok(art.canonicals.length > 0, 'R.canonicals is not empty.');
      t.ok(isString(art.title), 'R.title must be a string.');
      t.ok(art.title.length > 0, 'R.title is not empty.');
      t.ok(isString(art.description), 'R.description must be a string.');
      t.ok(isString(art.image), 'R.image must be a string.');
      t.ok(isString(art.content), 'R.content must be a string.');
      t.ok(isString(art.author), 'R.author must be a string.');
      t.ok(isString(art.source), 'R.source must be a string.');
      t.ok(isString(art.domain), 'R.domain must be a string.');
      t.ok(art.domain.length > 0, 'R.domain is not empty.');
      t.ok(isNumber(art.duration), 'R.duration must be a number.');
      t.ok(art.duration > 0, 'R.duration is greater than 0.');
      t.ok(isString(art.publishedTime), 'R.publishedTime must be a string.');
      t.end();
    }).catch((e) => {
      error(e);
      t.end();
    });
  });

  let badurl = 'https://www.youtube.com/watch?v=';

  test(`Testing with .extract('${badurl}')`, (t) => {
    extract(badurl).catch((e) => {
      let msg = `No video ID found`;
      t.equals(e.message, msg, 'It must return an error.');
    }).finally(t.end);
  });
})();
