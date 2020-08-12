import React, { useState } from 'react'
import { graphql } from 'gatsby'
import ReCaptcha from 'react-recaptcha'
import Layout from '~components/layout'
import { Form, Textarea, Input, Select, List } from '~components/common/form'
import { Row, Col } from '~components/common/grid'

export default ({ data }) => {
  const [name, setName] = useState(false)

  return (
    <Layout
      title="Contact Us: Data"
      socialCard={{
        description:
          'The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution.',
      }}
      centered
    >
      <Form
        method="POST"
        name="fa-form-1"
        action="https://webhook.frontapp.com/forms/c3c09a5603c02d2b7f86/KU--_qKvaSkUZHR2T92KQZ8hy5TatxTkRexeSE4NtpFltSVYROQxxbkIdSNH3RcHlZUI4RGGlHL7NwDr00Ki8WMFSOoBBMmgZ28PppSbXx-SQVi51ogAj28bbn6M"
        encType="multipart/form-data"
        acceptCharset="utf-8"
        referrerPolicy="unsafe-url"
      >
        <Select
          isRequired
          label="State"
          detailText="Please let us know which state's data you have a question or issue about"
          id="contact-state"
          name="state"
          options={[
            'All states (US Data)',
            ...data.allCovidStateInfo.nodes.map(node => node.name),
          ]}
        />
        <Input
          type="date"
          label="Date when issue began"
          id="contact-date"
          required
        />
        <List
          type="checkbox"
          id="contact-data"
          name="data-fields"
          label="Which fields are you contacting us about?"
          options={[
            'Cases',
            'Tests',
            'Hospitalization',
            'Recovery',
            'Death',
          ].map(item => ({
            value: item,
            label: item,
          }))}
        />
        <Row>
          <Col width={[4, 6, 6]} paddingRight={[0, 0, 32]}>
            <Input
              isRequired
              label="Your name"
              type="text"
              name="name"
              id="contact-name"
              onChange={event => setName(event.target.value)}
            />
          </Col>
          <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
            <Input
              isRequired
              type="email"
              label="Your email address"
              name="email"
              id="contact-email"
            />
          </Col>
        </Row>
        <Textarea
          label="Please describe the issue"
          name="body"
          id="contact-message"
        />
        <div>
          {typeof window !== 'undefined' && (
            <ReCaptcha
              sitekey={data.site.siteMetadata.recaptchaKey}
              render="explicit"
              elementID={`contact-form-captcha-${Math.round(
                Math.random() * 1000,
              )}`}
            />
          )}
        </div>

        <input
          type="text"
          aria-hidden
          style={{ display: 'none' }}
          name="subject"
          tabIndex="-1"
          value={`${name} - Data issues`}
        />
        <br />
        <input
          type="hidden"
          name="autoreply-from"
          value="contact@covidtracking.com"
        />
        <input
          type="hidden"
          name="autoreply-sender-name"
          value="The COVID Tracking Project"
        />
        <button type="submit">Contact us</button>
      </Form>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        recaptchaKey
      }
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        name
      }
    }
  }
`
