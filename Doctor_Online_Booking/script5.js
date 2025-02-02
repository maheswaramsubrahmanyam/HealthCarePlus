const doctors = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        location: "New York",
        availableTimes: ["10:00 AM", "2:00 PM", "4:00 PM"],
        travelTime: "30 mins",
        charges: "$200",
        treatmentTime: "1 hour",
        image: "https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.jpg?s=612x612&w=0&k=20&c=ofnikeDwvLhhEvLpSuQME5kWclGchqUKSHQFdQ4mcWo="
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialty: "Dermatologist",
        location: "Los Angeles",
        availableTimes: ["9:00 AM", "1:00 PM", "3:00 PM"],
        travelTime: "45 mins",
        charges: "$150",
        treatmentTime: "45 mins",
        image: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg"
    },
    {
        id: 3,
        name: "Dr. Emily Johnson",
        specialty: "Pediatrician",
        location: "Chicago",
        availableTimes: ["11:00 AM", "3:00 PM", "5:00 PM"],
        travelTime: "20 mins",
        charges: "$100",
        treatmentTime: "30 mins",
        image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww"
    },
    {
        id: 4,
        name: "Dr. Michael Brown",
        specialty: "Orthopedic",
        location: "Houston",
        availableTimes: ["8:00 AM", "12:00 PM", "6:00 PM"],
        travelTime: "40 mins",
        charges: "$250",
        treatmentTime: "1.5 hours",
        image: "https://www.wellingtonregional.com/sites/wellingtonregional.com/files/doctors_visit_1200x900.jpg"
    },
    {
        id: 5,
        name: "Dr. Sarah Lee",
        specialty: "Gynecologist",
        location: "Phoenix",
        availableTimes: ["10:30 AM", "2:30 PM", "4:30 PM"],
        travelTime: "35 mins",
        charges: "$180",
        treatmentTime: "1 hour",
        image: "https://cdn.prod.website-files.com/62d4f06f9c1357a606c3b7ef/65ddf3cdf19abaf5688af2f8_shutterstock_1933145801%20(1).jpg"
    },
    {
        id: 6,
        name: "Dr. David Wilson",
        specialty: "Neurologist",
        location: "Philadelphia",
        availableTimes: ["9:30 AM", "1:30 PM", "3:30 PM"],
        travelTime: "50 mins",
        charges: "$300",
        treatmentTime: "2 hours",
        image: "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
    },
    {
        id: 7,
        name: "Dr. Laura Martinez",
        specialty: "Psychiatrist",
        location: "San Antonio",
        availableTimes: ["11:30 AM", "3:30 PM", "5:30 PM"],
        travelTime: "25 mins",
        charges: "$220",
        treatmentTime: "1 hour",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnmhOXTH16dyqtHzr_deD2R2SURnW9kQ3gc05N2xujiWiqhoLY5CraRjOC_WSum7OaJFM&usqp=CAU"
    },
    {
        id: 8,
        name: "Dr. James Taylor",
        specialty: "Dentist",
        location: "San Diego",
        availableTimes: ["8:30 AM", "12:30 PM", "6:30 PM"],
        travelTime: "30 mins",
        charges: "$120",
        treatmentTime: "45 mins",
        image: "https://www.prepareforcanada.com/wp-content/uploads/1-FeaturedImg.jpg"
    }
];

const doctorsList = document.getElementById('doctors-list');
const bookingDetails = document.getElementById('booking-details');

function renderDoctors() {
    doctorsList.innerHTML = '';
    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <img src="${doctor.image}" alt="${doctor.name}">
            <h2>${doctor.name}</h2>
            <p><strong>Specialty:</strong> ${doctor.specialty}</p>
            <p><strong>Location:</strong> ${doctor.location}</p>
            <button onclick="showBookingDetails(${doctor.id})">Book Appointment</button>
        `;
        doctorsList.appendChild(doctorCard);
    });
}

function showBookingDetails(doctorId) {
    const doctor = doctors.find(doc => doc.id === doctorId);
    bookingDetails.innerHTML = `
        <h2>Booking Details for ${doctor.name}</h2>
        <p><strong>Specialty:</strong> ${doctor.specialty}</p>
        <p><strong>Location:</strong> ${doctor.location}</p>
        <p><strong>Available Times:</strong> ${doctor.availableTimes.join(', ')}</p>
        <p><strong>Travel Time to Patient Location:</strong> ${doctor.travelTime}</p>
        <p><strong>Charges:</strong> ${doctor.charges}</p>
        <p><strong>Treatment Time:</strong> ${doctor.treatmentTime}</p>
        <button onclick="confirmBooking(${doctor.id})">Confirm Booking</button>
    `;
}

function confirmBooking(doctorId) {
    const doctor = doctors.find(doc => doc.id === doctorId);
    alert(`Booking confirmed with ${doctor.name} at ${doctor.availableTimes[0]}`);
    bookingDetails.innerHTML = `<p>Your booking with ${doctor.name} is confirmed for ${doctor.availableTimes[0]}.</p>`;
}

renderDoctors();