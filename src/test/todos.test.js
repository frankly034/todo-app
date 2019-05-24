
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);

const { expect } = chai;

let authToken;
describe('Tests to get completed and uncompleted todos', () => {
  describe('Tests to get completed/uncompleted todos ', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'kerl',
          lastName: 'weggins',
          email: 'Refsdrl@gmail.com',
          password: 'lomardsd',
        })
        .end((err, res) => {
          authToken = res.body.data[0].token;
          done(err);
        });
    });

    it('Should return completed todos if authenticated', (done) => {
      chai
        .request(app)
        .get('/api/v1/todos/completed?isCompleted=true')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0].completed).to.be.equal(true);
          done(err);
        });
    });
    it('Should return uncompleted todos if authenticated', (done) => {
      chai
        .request(app)
        .get('/api/v1/todos/completed?isCompleted=false')
        .set('x-access-token', authToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.property('title');
          expect(res.body.data[0].completed).to.be.equal(false);
          done(err);
        });
    });
  });
});
