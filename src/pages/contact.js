import React from 'react'
import Layout from '../components/layout'
import Helmet from 'react-helmet'

class AboutIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <div className="wrapper postWrapper">
            <form action="https://formspree.io/mwkewadj" method="POST">
              <label>Your Email</label>
              <input type="email" name="_replyto" />
              <label>Subject</label>
              <input type="text" name="subject" />
              <label>Your Message</label>
              <textarea name="message"></textarea>
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
