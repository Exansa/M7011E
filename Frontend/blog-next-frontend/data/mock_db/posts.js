import getUsers from "./users";
import getLocations from "./location";
import getCategories from "./categories";
import getTags from "./tags";
import getMedia from "./media";

export default function getPosts() {
  const users = getUsers();
  const locations = getLocations();
  const categories = getCategories();
  const tags = getTags();
  const media = getMedia();

  const posts = [
    {
      id: 1,
      title: "MWS",
      created_at: "2022-07-02",
      content:
        "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      user: users[2],
      location: locations[34],
      category: categories[20],
      tags: [tags[0], tags[1], tags[2]],
      image: media[6],
    },
    {
      id: 2,
      title: "Algorithm Design",
      created_at: "2022-02-27",
      content:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
      user: users[2],
      location: locations[17],
      category: categories[19],
      tags: [tags[0], tags[1], tags[2]],
      image: media[10],
    },
    {
      id: 3,
      title: "Lifestyle",
      created_at: "2022-07-25",
      content:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
      user: users[2],
      location: locations[8],
      category: categories[18],
      tags: [tags[0], tags[1], tags[2]],
      image: media[9],
    },
    {
      id: 4,
      title: "GFI",
      created_at: "2022-03-15",
      content:
        "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      user: users[1],
      location: locations[12],
      category: categories[17],
      tags: [tags[0], tags[1], tags[2]],
      image: media[10],
    },
    {
      id: 5,
      title: "Broadcast Television",
      created_at: "2022-06-26",
      content:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      user: users[3],
      location: locations[16],
      category: categories[16],
      tags: [tags[0], tags[1], tags[2]],
      image: media[8],
    },
    {
      id: 6,
      title: "Customs Regulations",
      created_at: "2022-06-22",
      content:
        "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      user: users[3],
      location: locations[27],
      category: categories[15],
      tags: [tags[0], tags[1], tags[2]],
      image: media[9],
    },
    {
      id: 7,
      title: "Animation",
      created_at: "2022-02-20",
      content:
        "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
      user: users[2],
      location: locations[8],
      category: categories[14],
      tags: [tags[0], tags[1], tags[2]],
      image: media[6],
    },
    {
      id: 8,
      title: "Kinesiology",
      created_at: "2022-06-13",
      content:
        "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      user: users[1],
      location: locations[7],
      category: categories[13],
      tags: [tags[0], tags[1], tags[2]],
      image: media[8],
    },
    {
      id: 9,
      title: "SVG",
      created_at: "2022-04-01",
      content:
        "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
      user: users[2],
      location: locations[15],
      category: categories[12],
      tags: [tags[0], tags[1], tags[2]],
      image: media[7],
    },
  ];

  return posts;
}
