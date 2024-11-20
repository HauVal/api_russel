document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Récupère le token JWT pour les routes protégées

    // Vérifie si le token est présent, sinon redirige vers la page d'accueil
    if (!token) {
        window.location.href = 'index.html';
    }

    // Création d'un utilisateur
    document.getElementById('createUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById('userName').value,
            firstname: document.getElementById('userFirstname').value,
            email: document.getElementById('userEmail').value,
            password: document.getElementById('userPassword').value
        };
        await fetch('https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/users/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        alert("Utilisateur créé avec succès");
    });

    // Modification d'un utilisateur
    document.getElementById('updateUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userIdUpdate').value;
        const updatedData = {
            name: document.getElementById('newUserName').value,
            firstname: document.getElementById('newUserFirstname').value,
            email: document.getElementById('newUserEmail').value
        };
        await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });
        alert("Utilisateur modifié avec succès");
    });

    // Suppression d'un utilisateur
    document.getElementById('deleteUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userIdDelete').value;
        await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert("Utilisateur supprimé avec succès");
    });

    // Création d'un catway
    document.getElementById('createCatwayForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const catwayData = {
            catwayNumber: document.getElementById('catwayNumber').value,
            type: document.getElementById('catwayType').value
        };
        await fetch('https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/catways', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(catwayData)
        });
        alert("Catway créé avec succès");
    });

    // Modification d'un catway
    document.getElementById('updateCatwayForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const catwayId = document.getElementById('catwayIdUpdate').value;
        const newCatwayState = { catwayState: document.getElementById('newCatwayState').value };
        await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/catways/${catwayId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCatwayState)
        });
        alert("Catway modifié avec succès");
    });

    // Suppression d'un catway
    document.getElementById('deleteCatwayForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const catwayId = document.getElementById('catwayIdDelete').value;
        await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/catways/${catwayId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert("Catway supprimé avec succès");
    });

    // Récupération des détails d'un catway
    document.getElementById('getCatwayForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const catwayId = document.getElementById('catwayIdGet').value;
        const response = await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/catways/${catwayId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const catway = await response.json();
        alert(JSON.stringify(catway, null, 2));
    });

    // Enregistrement d'une réservation
    document.getElementById('createReservationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const reservationData = {
            catwayNumber: document.getElementById('reservationCatwayNumber').value,
            clientName: document.getElementById('clientName').value,
            boatName: document.getElementById('boatName').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value
        };
        await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/reservations/${reservationData.catwayNumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservationData)
        });
        alert("Réservation enregistrée avec succès");
    });

    // Suppression d'une réservation
    document.getElementById('deleteReservationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const reservationId = document.getElementById('reservationIdDelete').value;
        await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert("Réservation supprimée avec succès");
    });

    // Récupération des détails d'une réservation
    document.getElementById('getReservationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const reservationId = document.getElementById('reservationIdGet').value;
        const response = await fetch(`https://cryptic-cove-49012-31f7c559ec67.herokuapp.com/reservations/${reservationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const reservation = await response.json();
        alert(JSON.stringify(reservation, null, 2));
    });
});
