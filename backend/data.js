import bcrypt from 'bcrypt'
const data ={
    products: [
        {
          
          name: 'RedBull',
          category:'Drink',
          image: 'https://www.kindpng.com/picc/m/138-1383804_red-bull-png-image-background-red-bull-energy.png',
          price: 320,
          countInStock: 10,
          type:'Veg',
          rating: 4.5,
          numReviews: 10,
          description: 'Red Bull is a brand of energy drinks sold by Austrian company Red Bull GmbH. ',
        },
        {
          
          name: 'Mountain Dew',
          category: 'Drink',
          image: 'http://assets.stickpng.com/thumbs/587186d27b7f6103e35c6cc8.png',
          price: 60,
          countInStock: 20,
          type:'Veg',
          rating: 4.0,
          numReviews: 10,
          description: 'Mountain Dew is a carbonated soft drink brand produced and owned by PepsiCo',
        },
        {
         
          name: 'Sting',
          category: 'Drink',
          image: 'https://www.seekpng.com/png/detail/888-8887796_sting-strawberry-sting-energy-drink-india.png',
          price: 20,
          countInStock: 10,
          type:'Non-Veg',
          rating: 4.8,
          numReviews: 17,
          description: 'Sting Energy Drink is a carbonated energy drink from PepsiCo International and produced by Rockstar Inc.',
        },
        
      ],

}

export default data