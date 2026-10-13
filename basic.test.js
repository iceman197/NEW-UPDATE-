const test=require('node:test'),assert=require('node:assert/strict');const {courses,categories}=require('./catalog');const {checkPractice}=require('./practice');const {normalizeNumber,verifySession}=require('./security');
test('catalogue contains 49 learning areas and 16 tool categories',()=>{assert.equal(courses.length,49);assert.equal(categories.length,16)});
test('basic HTML exercise checker recognises heading and paragraph',()=>{assert.equal(checkPractice({type:'html',work:'<h1>Title</h1><p>Text</p>'}).status,'passed')});
test('basic HTML checker flags missing paragraph',()=>{assert.equal(checkPractice({type:'html',work:'<h1>Title</h1>'}).status,'needs-work')});
test('phone normalization validates international digits',()=>{assert.equal(normalizeNumber('233 55 123 4567'),'233551234567');assert.throws(()=>normalizeNumber('12345'))});
test('session checker rejects malformed tokens',()=>{assert.equal(verifySession('nope'),false)});
