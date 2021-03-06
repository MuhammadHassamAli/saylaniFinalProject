import React from "react";
import Avatar from '@material-ui/core/Avatar';

const userImageList = [
  {
    id: 1,
    // image: require('assets/images/userAvatar/avator1.jpg'),
  },
  {
    id: 2,
    // image: require('assets/images/userAvatar/avator2.jpg'),
  },
  {
    id: 3,
    // image: require('assets/images/userAvatar/avator3.jpg'),

  },
  {
    id: 4,
    // image: require('assets/images/userAvatar/avator4.jpg'),
    name: 'Mila Alba',
    rating: '5.0',
    deals: '27 Deals'
  },
]

export const aboutList = [
  {
    id: 1,
    title: 'Name',
    icon: 'city-alt',
    userList: '',
    desc: ['Asif Chohan']
  },
  {
    id: 2,
    title: 'Age',
    icon: 'cake',
    userList: '',
    desc: ['25']
  },
  {
    id: 3,
    title: 'Email',
    icon: 'graduation-cap',
    userList: '',
    desc: ['asifchohan@gmail.com']
  },
  {
    id: 4,
    title: 'Mobile',
    icon: 'home',
    userList: '',
    desc: ['+92 303 1234567']
  },
  {
    id: 5,
    title: 'Location',
    icon: 'home',
    userList: '',
    desc: ['Faisalabad Panjab, Pakistan']
  },
  // {
  //   id: 5,
  //   title: '4 Family Members',
  //   icon: 'group-work',
  //   userList: [<ul className="list-inline mb-0" key={1}>
  //     {userImageList.map((user, index) =>
  //       <li className="mb-2 list-inline-item" key={index}>
  //         <Avatar alt=".." className="size-30" src={user.image}/>
  //       </li>
  //     )
  //     }
  //   </ul>],
  //   desc: ''
  // },
];

export const eventList = [
  {
    id: 1,
    // image: require('assets/images/dashboard/beautiful-beauty-bright.jpg'),
    title: 'Sundance Film Festival.',
    address: 'Downsview Park, Toronto, Ontario',
    date: 'Feb 23, 2019',
  },
  {
    id: 2,
    // image: require('assets/images/dashboard/music.jpg'),
    title: 'Underwater Musical Festival.',
    address: 'Street Sacramento, Toronto, Ontario',
    date: 'Feb 24, 2019',
  },
  {
    id: 3,
    // image: require('assets/images/dashboard/concert.jpg'),
    title: 'Village Feast Fac',
    address: 'Union Street Eureka',
    date: 'Oct 25, 2019',
  }
];


export const contactList = [
  {
    id: 1,
    title: 'Email',
    icon: 'email',
    desc: [<span className="jr-link" key={1}>kiley.brown@example.com</span>]
  },
  {
    id: 2,
    title: 'Web page',
    icon: 'link',
    desc: [<span className="jr-link" key={2}>example.com</span>]
  }, {
    id: 3,
    title: 'Phone',
    icon: 'phone',
    desc: ['+1-987 (454) 987']
  },
];

export const friendList = [
  {
    id: 1,
    // image: require('assets/images/userAvatar/avator5.jpg'),
    name: 'Chelsea Johns',
    status: 'online'

  },
  {
    id: 2,
    // image: require('assets/images/userAvatar/avator6.jpg'),
    name: 'Ken Ramirez',
    status: 'offline'
  },
  {
    id: 3,
    // image: require('assets/images/userAvatar/avator7.jpg'),
    name: 'Chelsea Johns',
    status: 'away'

  },
  {
    id: 4,
    // image: require('assets/images/userAvatar/avator8.jpg'),
    name: 'Ken Ramirez',
    status: 'away'
  },
];
