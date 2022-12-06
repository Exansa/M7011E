const categories = [
  {
    id: 1,
    name: "Training",
    description:
      "sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean",
  },
  {
    id: 2,
    name: "Research and Development",
    description:
      "feugiat non pretium quis lectus suspendisse potenti in eleifend quam",
  },
  {
    id: 3,
    name: "Sales",
    description:
      "nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta",
  },
  {
    id: 4,
    name: "Sales",
    description:
      "ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non",
  },
  {
    id: 5,
    name: "Services",
    description:
      "vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt",
  },
  {
    id: 6,
    name: "Product Management",
    description:
      "mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean",
  },
  {
    id: 7,
    name: "Engineering",
    description:
      "praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi",
  },
  {
    id: 8,
    name: "Product Management",
    description:
      "hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate",
  },
  {
    id: 9,
    name: "Human Resources",
    description:
      "sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec",
  },
  {
    id: 10,
    name: "Sales",
    description:
      "dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla",
  },
  {
    id: 11,
    name: "Legal",
    description:
      "interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique",
  },
  {
    id: 12,
    name: "Product Management",
    description:
      "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis",
  },
  {
    id: 13,
    name: "Training",
    description:
      "et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id",
  },
  {
    id: 14,
    name: "Support",
    description:
      "in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium",
  },
  {
    id: 15,
    name: "Support",
    description:
      "etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut",
  },
  {
    id: 16,
    name: "Product Management",
    description:
      "eu massa donec dapibus duis at velit eu est congue elementum in",
  },
  {
    id: 17,
    name: "Research and Development",
    description:
      "proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing",
  },
  {
    id: 18,
    name: "Business Development",
    description:
      "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget",
  },
  {
    id: 19,
    name: "Marketing",
    description:
      "tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor",
  },
  {
    id: 20,
    name: "Product Management",
    description:
      "consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo",
  },
  {
    id: 21,
    name: "Engineering",
    description:
      "fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse",
  },
  {
    id: 22,
    name: "Research and Development",
    description:
      "luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat",
  },
  {
    id: 23,
    name: "Human Resources",
    description:
      "luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut",
  },
  {
    id: 24,
    name: "Accounting",
    description:
      "elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed",
  },
  {
    id: 25,
    name: "Legal",
    description:
      "vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac",
  },
  {
    id: 26,
    name: "Sales",
    description:
      "nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing",
  },
  {
    id: 27,
    name: "Accounting",
    description:
      "eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec",
  },
  {
    id: 28,
    name: "Engineering",
    description:
      "justo sollicitudin ut suscipit a feugiat et eros vestibulum ac",
  },
  {
    id: 29,
    name: "Marketing",
    description:
      "eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum",
  },
  {
    id: 30,
    name: "Product Management",
    description:
      "nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget",
  },
  {
    id: 31,
    name: "Legal",
    description:
      "ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis",
  },
  {
    id: 32,
    name: "Product Management",
    description:
      "morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci",
  },
  {
    id: 33,
    name: "Training",
    description:
      "convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis",
  },
  {
    id: 34,
    name: "Product Management",
    description:
      "pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa",
  },
  {
    id: 35,
    name: "Services",
    description:
      "in porttitor pede justo eu massa donec dapibus duis at velit eu est",
  },
  {
    id: 36,
    name: "Business Development",
    description:
      "pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis",
  },
  {
    id: 37,
    name: "Support",
    description:
      "nulla eget eros elementum pellentesque quisque porta volutpat erat quisque",
  },
  {
    id: 38,
    name: "Legal",
    description:
      "tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim",
  },
  {
    id: 39,
    name: "Research and Development",
    description:
      "aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt",
  },
  {
    id: 40,
    name: "Legal",
    description:
      "semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum",
  },
  {
    id: 41,
    name: "Services",
    description:
      "augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia",
  },
  {
    id: 42,
    name: "Sales",
    description:
      "est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim",
  },
  {
    id: 43,
    name: "Support",
    description:
      "turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem",
  },
  {
    id: 44,
    name: "Legal",
    description: "a nibh in quis justo maecenas rhoncus aliquam lacus morbi",
  },
  {
    id: 45,
    name: "Legal",
    description:
      "rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium",
  },
  {
    id: 46,
    name: "Research and Development",
    description:
      "vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl",
  },
  {
    id: 47,
    name: "Training",
    description:
      "suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur",
  },
  {
    id: 48,
    name: "Business Development",
    description:
      "donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis",
  },
  {
    id: 49,
    name: "Services",
    description:
      "bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis",
  },
  {
    id: 50,
    name: "Marketing",
    description:
      "eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla",
  },
];

export default categories;
