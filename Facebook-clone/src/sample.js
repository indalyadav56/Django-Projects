const data = [
  {
    id: 27,
    image:
      "http://127.0.0.1:8000/media/post/WhatsApp_Image_2019-03-14_at_4.14.04_PM.jpeg",
    title: "third post",
    created_at: "2021-04-21T11:53:58.538714Z",
    user: {
      id: 5,
      password: "hello",
      last_login: null,
      is_superuser: false,
      email: "hello1@gmai.com",
      username: "hello1",
      start_date: "2021-04-21T04:34:43.901273Z",
      full_name: "Hello Kumar",
      is_staff: false,
      is_active: true,
      groups: [],
      user_permissions: [],
    },
  },
  {
    id: 26,
    image:
      "http://127.0.0.1:8000/media/post/indalkumar56_20200820_195306_0.jpg",
    title: "second post",
    created_at: "2021-04-21T11:53:47.015966Z",
    user: {
      id: 5,
      password: "hello",
      last_login: null,
      is_superuser: false,
      email: "hello1@gmai.com",
      username: "hello1",
      start_date: "2021-04-21T04:34:43.901273Z",
      full_name: "Hello Kumar",
      is_staff: false,
      is_active: true,
      groups: [],
      user_permissions: [],
    },
  },
  {
    id: 25,
    image: "http://127.0.0.1:8000/media/post/1736539.jpg",
    title: "first post",
    created_at: "2021-04-21T11:53:36.085249Z",
    user: {
      id: 5,
      password: "hello",
      last_login: null,
      is_superuser: false,
      email: "hello1@gmai.com",
      username: "hello1",
      start_date: "2021-04-21T04:34:43.901273Z",
      full_name: "Hello Kumar",
      is_staff: false,
      is_active: true,
      groups: [],
      user_permissions: [],
    },
  },
];
const data2 = data.filter((value) => {
  data.push(value.image);
  console.log(value.image);
});

for (let i = 0; i < 0; i++) {
  console.log(data2[i]);
}
