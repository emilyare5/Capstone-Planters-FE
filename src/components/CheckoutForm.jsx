import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router';
import { CheckoutCart } from '../API';

function CheckoutForm() {

  const navigate = useNavigate();

  const handleOnClick = (event) => {

    event.preventDefault();
    CheckoutCart();
    navigate('/completedorder');

  };

  return (

    <Form className='checkform'>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridName">

          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter First and Last name" />

        </Form.Group>

      </Row>
      
      <Form.Group className="mb-3" controlId="formGridAddress1">

        <Form.Label>Shipping Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">

        <Form.Label>Address Line 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />

      </Form.Group>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridCity">

          <Form.Label>City</Form.Label>
          <Form.Control />

        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">

          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
          </Form.Select>

        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">

          <Form.Label>Zip</Form.Label>
          <Form.Control />

        </Form.Group>

      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">

        <Form.Check type="checkbox" label="Billing Address same as Shipping" />

      </Form.Group>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridName">

          <Form.Label>Name on Card</Form.Label>
          <Form.Control type="name" placeholder="Enter First and Last name" />

        </Form.Group>

      </Row>

      <Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">

          <Form.Label>Billing Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">

          <Form.Label>Address Line 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />

        </Form.Group>

        <Row className="mb-3">

          <Form.Group as={Col} controlId="formGridCity">

            <Form.Label>City</Form.Label>
            <Form.Control />

          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">

            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
            </Form.Select>

          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">

            <Form.Label>Zip</Form.Label>
            <Form.Control />

          </Form.Group>

        </Row>

      </Row>

      <Form.Group className="mb-3" controlId="formGridCardNum">

        <Form.Label>Card Number</Form.Label>
        <Form.Control placeholder="1234 5678 9101 1121" />

      </Form.Group>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridSecurityCode">

          <Form.Label>Security Code</Form.Label>
          <Form.Control placeholder="123" />

        </Form.Group>

        <Form.Group as={Col} controlId="formGridExpiration">

          <Form.Label>Expiration Date</Form.Label>
          <Form.Control placeholder="MM/YY" />

        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">

          <Form.Label>Zip</Form.Label>
          <Form.Control />

        </Form.Group>

      </Row>


      <Button variant="success" type="submit" onClick={handleOnClick}>
        Submit Order
      </Button>

    </Form>

  );
};

export default CheckoutForm;