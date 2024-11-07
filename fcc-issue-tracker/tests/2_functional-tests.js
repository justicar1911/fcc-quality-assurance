const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    let testId;
    // #1
    test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/apitest')
            .send({
                issue_title: 'This is a test title',
                issue_text: 'This is a test text',
                created_by: 'Tester',
                assigned_to: 'Developer',
                status_text: 'In Progress'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, '_id', 'Response should include _id');
                assert.property(res.body, 'issue_title', 'Response should include issue_title');
                assert.property(res.body, 'issue_text', 'Response should include issue_text');
                assert.property(res.body, 'created_by', 'Response should include created_by');
                assert.property(res.body, 'assigned_to', 'Response should include assigned_to');
                assert.property(res.body, 'status_text', 'Response should include status_text');
                assert.property(res.body, 'open', 'Response should include issue_title');
                assert.property(res.body, 'created_on', 'Response should include issue_text');
                assert.property(res.body, 'updated_on', 'Response should include created_by');
                assert.equal(res.body.issue_title, 'This is a test title');
                assert.equal(res.body.issue_text, 'This is a test text');
                assert.equal(res.body.created_by, 'Tester');
                assert.equal(res.body.assigned_to, 'Developer');
                assert.equal(res.body.status_text, 'In Progress');
                assert.isTrue(res.body.open);
                testId = res.body._id;
                done();
            });
    });

    // #2
    test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/apitest')
            .send({
                issue_title: 'This is a required title',
                issue_text: 'This is a required text',
                created_by: 'Tester',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'issue_title', 'Response should include issue_title');
                assert.property(res.body, 'issue_text', 'Response should include issue_text');
                assert.property(res.body, 'created_by', 'Response should include created_by');
                assert.property(res.body, 'open', 'Response should include issue_title');
                assert.property(res.body, 'created_on', 'Response should include issue_text');
                assert.property(res.body, 'updated_on', 'Response should include created_by');
                assert.equal(res.body.issue_title, 'This is a required title');
                assert.equal(res.body.issue_text, 'This is a required text');
                assert.equal(res.body.created_by, 'Tester');
                assert.isTrue(res.body.open);
                done();
            });
    });

    // #3
    test('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/issues/apitest')
            .send({
                issue_title: 'This is a required title'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'error', 'Response should include error message');
                assert.equal(res.body.error, 'required field(s) missing', 'Error message should be "required field(s) missing"');
                done();
            });
    });

    // #4
    test('View issues on a project: GET request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest/')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body, 'Response should be an array');
                if (res.body.length > 0) {
                    assert.property(res.body[0], 'issue_title', 'Issues should have an issue_title');
                    assert.property(res.body[0], 'issue_text', 'Issues should have an issue_text');
                    assert.property(res.body[0], 'created_by', 'Issues should have a created_by field');
                    assert.property(res.body[0], 'assigned_to', 'Issues should have an assigned_to field');
                    assert.property(res.body[0], 'status_text', 'Issues should have a status_text field');
                    assert.property(res.body[0], 'open', 'Issues should have a open field');
                    assert.property(res.body[0], 'created_on', 'Issues should have a created_on field');
                    assert.property(res.body[0], 'updated_on', 'Issues should have a updated_on field');
                }
                done();
            });
    });

    // #5
    test('View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .query({ created_by: 'Tester' })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body, 'Response should be an array');
                if (res.body.length > 0) {
                    res.body.forEach(issue => {
                        assert.equal(issue.created_by, 'Tester', 'Each issue should be created by "Tester"');
                        assert.property(issue, 'issue_title', 'Issues should have an issue_title');
                        assert.property(issue, 'issue_text', 'Issues should have an issue_text');
                        assert.property(issue, 'created_by', 'Issues should have a created_by field');
                        assert.property(issue, 'assigned_to', 'Issues should have an assigned_to field');
                        assert.property(issue, 'status_text', 'Issues should have a status_text field');
                        assert.property(issue, 'open', 'Issues should have a open field');
                        assert.property(issue, 'created_on', 'Issues should have a created_on field');
                        assert.property(issue, 'updated_on', 'Issues should have a updated_on field');
                    });
                }
                done();
            });
    });

    // #6
    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/issues/apitest')
            .query(
                { created_by: 'Tester', _id: testId })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body, 'Response should be an array');
                if (res.body.length > 0) {
                    res.body.forEach(issue => {
                        assert.equal(issue.created_by, 'Tester', 'Each issue should be created by "Tester"');
                        assert.equal(issue._id, testId, 'Each issue should have the coresponded _id');
                        assert.property(issue, 'issue_title', 'Issues should have an issue_title');
                        assert.property(issue, 'issue_text', 'Issues should have an issue_text');
                        assert.property(issue, 'created_by', 'Issues should have a created_by field');
                        assert.property(issue, 'assigned_to', 'Issues should have an assigned_to field');
                        assert.property(issue, 'status_text', 'Issues should have a status_text field');
                        assert.property(issue, 'open', 'Issues should have a open field');
                        assert.property(issue, 'created_on', 'Issues should have a created_on field');
                        assert.property(issue, 'updated_on', 'Issues should have a updated_on field');
                    });
                }
                done();
            });
    });

    // #7
    test('Update one field on an issue: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .put(`/api/issues/apitest`)
            .send({
                _id: testId,
                assigned_to: 'New Developer'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'result', 'Response should include result message');
                assert.property(res.body, '_id', 'Response should include _id message');
                assert.equal(res.body.result, 'successfully updated', 'Result message should be "successfully updated"');
                assert.equal(res.body._id, testId, 'Return the corespondent _id');
                done();
            });
    });

    // #8
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function (done) {

        chai
            .request(server)
            .put(`/api/issues/apitest`)
            .send({
                _id: testId,
                assigned_to: 'New Developer',
                status_text: 'In Review',
                issue_text: 'This issue has been updated with multiple fields.'
            })
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'result', 'Response should include result message');
                assert.property(res.body, '_id', 'Response should include _id message');
                assert.equal(res.body.result, 'successfully updated', 'Result message should be "successfully updated"');
                assert.equal(res.body._id, testId, 'Returned _id should match the input _id');
                done();
            });
    });

    // #9
    test('Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .put(`/api/issues/apitest`)
            .send({
                assigned_to: 'New Developer',
                status_text: 'In Review',
                issue_text: 'This issue has been updated with multiple fields.'
            })
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'error', 'Response should include error message');
                assert.equal(res.body.error, 'missing _id', 'Error message should be "missing _id"');
                done();
            });
    });

    // #10
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {

        chai
            .request(server)
            .put(`/api/issues/apitest`)
            .send({ _id: testId })
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'error', 'Response should include error message');
                assert.property(res.body, '_id', 'Response should include _id message');
                assert.equal(res.body.error, 'no update field(s) sent', 'Error message should be "no update field(s) sent"');
                assert.equal(res.body._id, testId, 'Return the corespondent _id');
                done();
            });
    });

    // #11
    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
        const _id = '672baa4f11a872944e6a656b';

        chai
            .request(server)
            .put(`/api/issues/apitest`)
            .send({
                _id,
                assigned_to: 'New Developer',
                status_text: 'In Review',
                issue_text: 'This issue has been updated with multiple fields.'
            })
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'error', 'Response should include error message');
                assert.property(res.body, '_id', 'Response should include _id message');
                assert.equal(res.body.error, 'could not update', 'Error message should be "could not update"');
                assert.equal(res.body._id, _id, 'Return the corespondent _id');
                done();
            });
    });

    // #12
    test('Delete an issue: DELETE request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .delete(`/api/issues/apitest`)
            .send({ _id: testId })
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'result', 'Response should include result message');
                assert.property(res.body, '_id', 'Response should include _id message');
                assert.equal(res.body.result, 'successfully deleted', 'Result message should be "successfully deleted"');
                assert.equal(res.body._id, testId, 'Returned _id should match the input _id');
                done();
            });
    });

    // #13
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .delete(`/api/issues/apitest`)
            .send({ _id: '672ba9a8f25d0d6769f7421sc' })
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'error', 'Response should include error message');
                assert.property(res.body, '_id', 'Response should include _id message');
                assert.equal(res.body.error, 'could not delete', 'Error message should be "could not delete"');
                assert.equal(res.body._id, '672ba9a8f25d0d6769f7421sc', 'Returned _id should match the input _id');
                done();
            });
    });

    // #14
    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .delete(`/api/issues/apitest`)
            .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.isObject(res.body, 'Response should be an object');
                assert.property(res.body, 'error', 'Response should include error message');
                assert.equal(res.body.error, 'missing _id', 'Error message should be "missing _id"');
                done();
            });
    });


});
