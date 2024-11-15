(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const app = require('../app');

    const { expect } = chai;
    chai.use(chaiHttp);

    // Tests unitaires
    describe('Tests de l\'API Port de Plaisance', () => {

        it('devrait créer un utilisateur', (done) => {
            chai.request(app)
                .put('/users/add')
                .send({
                    name: "Utilisateur Test",
                    firstname: "Test",
                    email: "test@example.com",
                    password: "motdepasse123"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });

        it('devrait modifier un utilisateur', (done) => {
            const userId = "672c89fc9fbd4390c4f3d39c";
            chai.request(app)
                .patch(`/users/${userId}`)
                .send({ name: "Nom Modifié" })
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', 'Nom Modifié');
                    done();
                });
        });

        it('devrait supprimer un utilisateur', (done) => {
            const userId = "672c89fc9fbd4390c4f3d39c";
            chai.request(app)
                .delete(`/users/${userId}`)
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });

        it('devrait créer un catway', (done) => {
            chai.request(app)
                .post('/catways')
                .send({
                    catwayNumber: 1,
                    type: "long"
                })
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });

        it('devrait modifier l\'état d\'un catway', (done) => {
            const catwayId = "672bde57d256cdaf4b0cd25e";
            chai.request(app)
                .put(`/catways/${catwayId}`)
                .send({ catwayState: "Indisponible" })
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('catwayState', 'Indisponible');
                    done();
                });
        });

        it('devrait supprimer un catway', (done) => {
            const catwayId = "672bde57d256cdaf4b0cd25e";
            chai.request(app)
                .delete(`/catways/${catwayId}`)
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });

        it('devrait afficher les détails d\'un catway', (done) => {
            const catwayId = "672bde57d256cdaf4b0cd25e";
            chai.request(app)
                .get(`/catways/${catwayId}`)
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id', catwayId);
                    done();
                });
        });

        it('devrait enregistrer une réservation', (done) => {
            chai.request(app)
                .post('/reservations/1')
                .send({
                    clientName: "Client Test",
                    boatName: "Bateau Test",
                    checkIn: "2023-01-01",
                    checkOut: "2023-01-10"
                })
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });

        it('devrait afficher les détails d\'une réservation', (done) => {
            const reservationId = "67376dc93399b0856d4ff929";
            chai.request(app)
                .get(`/reservations/${reservationId}`)
                .set('Authorization', `Bearer {token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_id', reservationId);
                    done();
                });
        });

    });

})();
