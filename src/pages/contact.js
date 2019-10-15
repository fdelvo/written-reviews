import React from 'react'
import Layout from '../components/layout'
import Helmet from 'react-helmet'

class AboutIndex extends React.Component {
  state = {
    from: "",
    message: "",
  }
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'floriandelvo@googlemail.com',
      Password: '85a840fe-32aa-4b52-a82a-b5c58bbb0cc4',
      To: 'florian.delvo@googlemail.com',
      From: this.state.from,
      Subject: 'Contact Form Mail',
      Body: this.state.message,
    }).then(message = alert(message));
  }
  render() {
    return (
      <Layout location={this.props.location}>
        <Helmet>
          <script crossOrigin src="http://smtpjs.com/smtp.js"></script>
        </Helmet>
        <div style={{ background: '#fff' }}>
          <div className="wrapper postWrapper">
            <form onSubmit={this.handleSubmit}>
              <label>Your Email</label>
              <input type="email" name="from" value={this.state.from} onChange={this.handleInputChange} />
              <label>Your Message</label>
              <textarea name="message" value={this.state.message} onChange={this.handleInputChange}></textarea>
              <br />
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutIndex
