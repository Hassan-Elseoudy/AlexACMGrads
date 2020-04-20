import React, {
  Component
} from 'react';
import {
  Nav,
  Navbar, Card, Button
} from 'react-bootstrap'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import Page from 'react-page-loading'


class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: {},
      ready: false
    }
  }

  componentDidMount() {

    fetch('http://gsx2json.com/api?id=1kmsaQSMcpm99EUkqz472Abd-GBsv4QkwgyeVc7rJJbg&sheet=1&columns=true')
      .then(response => response.json())
      .then(data => this.setState({ data: data.rows, ready: true }));
  }

  render() {
    if (!this.state.ready)
      return (<div>
        <Page loader={"bar"} color={"#A9A9A9"} size={10}>
        </Page>
      </div>)

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="https://www.facebook.com/AlexACM.SC/ ">ACM Alexandria Student Chapter</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="https://facebook.com/AlexACM.SC/ ">
                <Button variant="outline-light"> Facebook</Button>
              </Nav.Link>
              <Nav.Link href="https://twitter.com/Alex_ACM_SC?s=09">
                |   <Button variant="outline-light"> Twitter</Button>
              </Nav.Link>
              <Nav.Link href="https://www.linkedin.com/company/acm-alexandria ">
                |   <Button variant="outline-light"> LinkedIn</Button>
              </Nav.Link>
              <Nav.Link href="https://forms.gle/QUTo8r5kwpYy9tYU8">
                |   <Button variant="outline-light"> Join The List!</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Card className="text-center" border="dark">
          <Card.Header><h2>YOUR GUIDE TO THE DREAM JOB!</h2></Card.Header>
          <Card.Body>
            <Card.Text>
              <b>We will help you finding connections that put you on the right path to join companies</b>
            </Card.Text>
            <Card.Text>
              <b>You can sort the table by clicking on the column or filter by search.</b>
            </Card.Text>

            <ReactTable
              data={this.state.data}
              filterable
              defaultFilterMethod={(filter, row) => {
                const id = filter.pivotId || filter.id
                return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
              }}
              columns={[
                {
                  columns: [
                    {
                      Header: "Name",
                      accessor: "name"
                    },
                    {
                      Header: "Email",
                      accessor: "email"
                    },
                    {
                      Header: "LinkedIn",
                      accessor: "linkedin"
                    },
                    {
                      Header: "Company",
                      accessor: "company"
                    },
                    {
                      Header: "City",
                      accessor: "city"
                    },
                    {
                      Header: "Position",
                      accessor: "position"
                    }

                  ]
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
              noDataText="Nothing here yet." />
          </Card.Body>
          <Card.Footer><b>Made with ❤️ by: ACM Alexandria SC Technical Team</b></Card.Footer>
        </Card>
      </div>
    );
  }


}

export default Home;