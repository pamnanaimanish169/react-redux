import { useEffect, useState } from "react";
import {
  Button,
  Card,
  ListGroup,
  Navbar,
  Container,
  Dropdown,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

const products = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617__340.jpg",
    title: "iPhoneX",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 100,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    title: "Samsung Galaxy S21+ 5G",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 125,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1645593446813-66d1b568d5fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    title: "iPhone 13",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 75,
  },
  {
    id: 4,
    image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
    title: "Google Pixel 6",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 155,
  },
  {
    id: 5,
    image:
      "https://www.shutterstock.com/image-photo/bangkok-thailand-samsung-launch-new-600w-1704070018.jpg",
    title: "Samsung Fold 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 160,
  },
];

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  let total = 0;
  let price = 0;

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state?.cartList);

  function handleAddToCart(item) {
    if (cartList?.find((element) => element?.id === item?.id)) {
      dispatch({ type: "update", payload: item });
    } else {
      dispatch({ type: "add", payload: item });
    }
  }

  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function handleIncrement(event, item) {
    dispatch({ type: "increment", payload: item });
  }

  function handleDecrement(event, item) {
    dispatch({ type: "decrement", payload: item });
  }

  function handleOnRemove(item) {
    dispatch({ type: "remove", payload: item });
  }

  return (
    <div className="App">
      <Navbar className="header">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Cart
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <h2 className="py-2 px-4">Your Bag({cartList?.length})</h2>
                  {cartList &&
                    cartList.map((item) => (
                      <div key={item?.id}>
                        <div
                          style={{
                            padding: "30px",
                            display: 'flex',
                            flexDirection: 'row'
                          }}
                        >
                          <div>
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                display: "flex",
                                flexDirection: "column",
                              }}
                              src={item?.image}
                            ></Image>
                          </div>
                          <div>
                            <div>
                              {item?.title}
                              <Button
                                variant="danger"
                                onClick={() => handleOnRemove(item)}
                              >
                                Remove
                              </Button>
                            </div>
                            <div>{item?.amount}</div>
                            <div>
                              <Button
                                onClick={(event) =>
                                  handleIncrement(event, item)
                                }
                              >
                                +
                              </Button>
                              <Button
                                onClick={(event) =>
                                  handleDecrement(event, item)
                                }
                              >
                                -
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div>
                    {cartList.map((element) => {
                      total += element?.amount;
                      price += element?.amount * element?.price;
                    })}
                  </div>
                  Quantity : {total}
                  <br />
                  Price : {price}
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2>Width: {windowSize?.innerWidth}</h2>

      <h2>Height: {windowSize?.innerHeight}</h2>

      <Container>
        <Row>
          {products.map((item) => (
            <Col xs={12} md={6} lg={4} style={{padding : 10}}>
              <Card style={{ width: "18rem" }} key={item?.id}>
                <Card.Img src={item?.image} className="responsive" />
                <Card.Body>
                  <Card.Title>{item?.title}</Card.Title>
                  <Card.Text>{item?.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
