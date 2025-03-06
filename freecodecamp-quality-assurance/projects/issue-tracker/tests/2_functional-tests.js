const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  const testProject = 'testproject';
  let testIssueId;

  // POST tests
  test('Create an issue with every field', function (done) {
    chai
      .request(server)
      .post(`/api/issues/${testProject}`)
      .send({
        issue_title: 'Test Issue',
        issue_text: 'This is a test issue',
        created_by: 'Test User',
        assigned_to: 'Test Assignee',
        status_text: 'In Progress',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Test Issue');
        assert.equal(res.body.issue_text, 'This is a test issue');
        assert.equal(res.body.created_by, 'Test User');
        assert.equal(res.body.assigned_to, 'Test Assignee');
        assert.equal(res.body.status_text, 'In Progress');
        assert.property(res.body, '_id');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        assert.property(res.body, 'open');

        // Save for later tests
        testIssueId = res.body._id;

        done();
      });
  });

  test('Create an issue with only required fields', function (done) {
    chai
      .request(server)
      .post(`/api/issues/${testProject}`)
      .send({
        issue_title: 'Required Fields Test',
        issue_text: 'Testing with required fields only',
        created_by: 'Test User',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Required Fields Test');
        assert.equal(res.body.issue_text, 'Testing with required fields only');
        assert.equal(res.body.created_by, 'Test User');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        assert.property(res.body, '_id');

        done();
      });
  });

  test('Create an issue with missing required fields', function (done) {
    chai
      .request(server)
      .post(`/api/issues/${testProject}`)
      .send({
        issue_title: 'Missing Fields Test',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing');

        done();
      });
  });

  // GET tests
  test('View issues on a project', function (done) {
    chai
      .request(server)
      .get(`/api/issues/${testProject}`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');

        done();
      });
  });

  test('View issues on a project with one filter', function (done) {
    chai
      .request(server)
      .get(`/api/issues/${testProject}?open=true`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);

        res.body.forEach((issue) => {
          assert.equal(issue.open, true);
        });

        done();
      });
  });

  test('View issues on a project with multiple filters', function (done) {
    chai
      .request(server)
      .get(`/api/issues/${testProject}?open=true&created_by=Test User`)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);

        res.body.forEach((issue) => {
          assert.equal(issue.open, true);
          assert.equal(issue.created_by, 'Test User');
        });

        done();
      });
  });

  // PUT tests
  test('Update one field on an issue', function (done) {
    chai
      .request(server)
      .put(`/api/issues/${testProject}`)
      .send({
        _id: testIssueId,
        issue_title: 'Updated Title',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, testIssueId);

        done();
      });
  });

  test('Update multiple fields on an issue', function (done) {
    chai
      .request(server)
      .put(`/api/issues/${testProject}`)
      .send({
        _id: testIssueId,
        issue_title: 'Multiple Updates',
        issue_text: 'Updated text',
        status_text: 'Completed',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, testIssueId);

        done();
      });
  });

  test('Update an issue with missing _id', function (done) {
    chai
      .request(server)
      .put(`/api/issues/${testProject}`)
      .send({
        issue_title: 'No ID Update',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');

        done();
      });
  });

  test('Update an issue with no fields to update', function (done) {
    chai
      .request(server)
      .put(`/api/issues/${testProject}`)
      .send({
        _id: testIssueId,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'no update field(s) sent');

        done();
      });
  });

  test('Update an issue with an invalid _id', function (done) {
    chai
      .request(server)
      .put(`/api/issues/${testProject}`)
      .send({
        _id: '5f665eb46e296f6b9b6a504d',
        issue_title: 'Invalid ID Update',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not update');

        done();
      });
  });

  // DELETE tests
  test('Delete an issue', function (done) {
    chai
      .request(server)
      .delete(`/api/issues/${testProject}`)
      .send({
        _id: testIssueId,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully deleted');
        assert.equal(res.body._id, testIssueId);

        done();
      });
  });

  test('Delete an issue with an invalid _id', function (done) {
    chai
      .request(server)
      .delete(`/api/issues/${testProject}`)
      .send({
        _id: '5f665eb46e296f6b9b6a504d',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'could not delete');

        done();
      });
  });

  test('Delete an issue with missing _id', function (done) {
    chai
      .request(server)
      .delete(`/api/issues/${testProject}`)
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'missing _id');

        done();
      });
  });
});
