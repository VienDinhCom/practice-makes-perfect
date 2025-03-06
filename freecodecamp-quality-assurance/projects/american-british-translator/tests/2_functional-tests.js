const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "I ate yogurt for breakfast.",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        // Expected translation based on the translator should highlight "yoghurt"
        assert.property(res.body, 'translation');
        assert.equal(res.body.translation, "I ate <span class=\"highlight\">yoghurt</span> for breakfast.");
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "I ate yogurt for breakfast.",
        locale: "invalid-locale"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "Invalid value for locale field");
        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "I ate yogurt for breakfast."
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, "No text to translate");
        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    chai.request(server)
      .post('/api/translate')
      .send({
        text: "Hello",
        locale: "american-to-british"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'translation');
        // When no translation is needed, the API returns this message
        assert.equal(res.body.translation, "Everything looks good to me!");
        done();
      });
  });
});
