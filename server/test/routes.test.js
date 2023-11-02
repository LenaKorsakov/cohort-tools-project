const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');

const app = require('../app');

chai.use(chaiHttp);

describe('get all cohorts', () => {
  it('should return 200 and all cohorts', async () => {
    const response = await request(app).get('/api/cohorts');

    expect(response.status).to.equal(200);
    assert.isArray(response.body);
    assert.isNotEmpty(response.body);
    // expect(response.body).contains({
    //   _id: '616c4b4c649eaa001dd50f82',
    //   cohortSlug: 'pt-ux-berlin-2023-02-06',
    //   cohortName: 'PT UX BERLIN 2023 02',
    //   program: 'UX/UI',
    //   format: 'Part Time',
    //   campus: 'Berlin',
    //   startDate: '2023-02-06T00:00:00.000Z',
    //   endDate: '2023-08-06T00:00:00.000Z',
    //   inProgress: false,
    //   programManager: 'Alice Williams',
    //   leadTeacher: 'Bob Johnson',
    //   totalHours: 360,
    // });
  });
});
