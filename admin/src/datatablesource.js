export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
      },
    
      {
        field: "age",
        headerName: "Age",
        width: 100,
      },
      {
        field: "status",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        },
      },
    ];




//temporary data until i get from DB
export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];

  export const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.manufacturer}
          </div>
        );
      },
    },
    {
      field: "model",
      headerName: "Model",
      width: 100,
    },
    {
      field: "year",
      headerName: "Year",
      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    }
  ]


  //temporary data until i get from DB
  //tell alon that he needs to add ID to each product
  export const productRows = [
      { id: 1,manufacturer: "Bentley", model: "Arnage", year: 2006, color: "Indigo", kilometers: 65588, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Occ of rail trn/veh inj d/t explosn or fire on train, subs" },
      {id: 2, manufacturer: "Hyundai", model: "Genesis Coupe", year: 2010, color: "Purple", kilometers: 94500, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Nondisp fx of lateral cuneiform of unspecified foot, sequela" },
      { id: 3,manufacturer: "Ford", model: "Escort", year: 2004, color: "Mauv", kilometers: 124991, image: "http://dummyimage.com/250x250.png/5fa2dd/ffffff", description: "Displ avuls fx tuberosity of unsp calcaneus, init for opn fx" },
      { id: 4,manufacturer: "Chrysler", model: "Sebring", year: 1998, color: "Teal", kilometers: 122516, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Superficial foreign body of unspecified finger, subs encntr" },
      { id: 5,manufacturer: "Ford", model: "Ranger", year: 2011, color: "Mauv", kilometers: 31609, image: "http://dummyimage.com/250x250.png/5fa2dd/ffffff", description: "Pilon fracture of tibia" },
      { id: 6,manufacturer: "Pontiac", model: "Vibe", year: 2008, color: "Maroon", kilometers: 112303, image: "http://dummyimage.com/250x250.png/dddddd/000000", description: "Colles' fracture of left radius, sequela" },
      { id: 7,manufacturer: "Cadillac", model: "Escalade", year: 2004, color: "Maroon", kilometers: 85174, image: "http://dummyimage.com/250x250.png/cc0000/ffffff", description: "Nondisplaced midcervical fracture of unspecified femur" },
      { id: 8,manufacturer: "Toyota", model: "Camry", year: 2003, color: "Orange", kilometers: 129953, image: "http://dummyimage.com/250x250.png/5fa2dd/ffffff", description: "Nondisp commnt fx shaft of r femr, 7thE" },
      // { manufacturer: "Volkswagen", model: "Touareg", year: 2003, color: "Indigo", kilometers: 30188, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Other specified disorders of tendon, right knee" },
      // { manufacturer: "Chevrolet", model: "Citation", year: 1980, color: "Teal", kilometers: 48864, image: "http://dummyimage.com/250x250.png/dddddd/000000", description: "Displaced oblique fracture of shaft of right ulna, init" },
      // { manufacturer: "Nissan", model: "JUKE", year: 2012, color: "Green", kilometers: 116741, image: "http://dummyimage.com/250x250.png/5fa2dd/ffffff", description: "Unsp fx upr end l tibia, 7thE" },
      // { manufacturer: "BMW", model: "5 Series", year: 2005, color: "Yellow", kilometers: 11397, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Major laceration of femoral artery, right leg, init encntr" },
      // { manufacturer: "Audi", model: "80", year: 1989, color: "Crimson", kilometers: 137676, image: "http://dummyimage.com/250x250.png/dddddd/000000", description: "Toxic effects of other organic solvents" },
      // { manufacturer: "BMW", model: "3 Series", year: 2009, color: "Blue", kilometers: 14580, image: "http://dummyimage.com/250x250.png/dddddd/000000", description: "Kitchen in apartment as place" },
      // { manufacturer: "Aston Martin", model: "V8 Vantage", year: 2008, color: "Puce", kilometers: 83667, image: "http://dummyimage.com/250x250.png/dddddd/000000", description: "Disp fx of unsp tibial tuberosity, 7thP" },
      // { manufacturer: "Mitsubishi", model: "Mirage", year: 1987, color: "Purple", kilometers: 23520, image: "http://dummyimage.com/250x250.png/cc0000/ffffff", description: "Other sprain of right index finger, sequela" },
      // { manufacturer: "Daihatsu", model: "Rocky", year: 1992, color: "Blue", kilometers: 145343, image: "http://dummyimage.com/250x250.png/cc0000/ffffff", description: "Driver of hv veh injured in clsn w ped/anml in traf, sequela" },
      // { manufacturer: "Volkswagen", model: "New Beetle", year: 2009, color: "Teal", kilometers: 95409, image: "http://dummyimage.com/250x250.png/5fa2dd/ffffff", description: "Poisoning by opth drugs and preparations, self-harm, sequela" },
      // { manufacturer: "Kia", model: "Sorento", year: 2013, color: "Goldenrod", kilometers: 136048, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Bladder disorder, unspecified" },
      // { manufacturer: "Porsche", model: "911", year: 1986, color: "Teal", kilometers: 138302, image: "http://dummyimage.com/250x250.png/ff4444/ffffff", description: "Disp fx of less trochanter of unsp femr, 7thN" },
  ];