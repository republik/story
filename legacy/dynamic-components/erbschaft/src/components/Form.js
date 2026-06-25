import React, { Component } from 'react';

import {Button, Dropdown, Field, Interaction, InlineSpinner, Label, colors, Radio, fontFamilies} from '@project-r/styleguide'
import AutosizeInput from 'react-textarea-autosize'
import { css } from 'glamor'
import isEmail from 'validator/lib/isEmail'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const styles = {
 autoSize: css({
   minHeight: 40,
   paddingTop: '7px !important',
   paddingBottom: '6px !important',
   background: 'transparent'
 })
}

function validateTextfield(content) {
  if (content.length > 2000) {
    return 'Text zu lang'
  } else {
    return null
  }
  }

function validateEmailAdress(email){
 if (isEmail(email)) {
  return null
 } else {
  return 'Geben sie eine gültige E-Mail-Adresse an'
 }
}

function myStory(inheritanceBattle) {
      if(inheritanceBattle) {
        return "Worum ging es bei diesem Streit konkret?"
      } else {
        return "Kennen Sie eine interessante Erbgeschichte, von der wir wissen sollten?"
      }
}

const errorToString = error => error.graphQLErrors && error.graphQLErrors.length
  ? error.graphQLErrors.map(e => e.message).join(', ')
  : error.toString()

const Question = (props) => <div style={{marginBottom: 10, marginTop: 30}}>{props.children}</div>
const Section = (props) => <div style={{marginBottom: 30}}>{props.children}</div>

class Form extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: props.data.me
        ? props.data.me.email
        : '',
      inheritanceFrom: "",
      inheritanceFromA: false,
      count: 0,
      inheritanceType:"",
      inheritanceTypeA: false,
      value: "",
      inheritanceBattle: true,
      validateEmail: false,
      content: "",
      heritage: "",
      testament: false,
      tel: props.data.me
        ? props.data.me.phoneNumber
        : '',
      submitted: false,
      loading: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.email || state.phoneNumber) {
      return null
    }
    // do not use partial data (e.g. only email) while loading
    if (props.data.me && !props.data.loading) {
      return {
        email: props.data.me.email,
        tel: props.data.me.phoneNumber
      }
    }
    return null
  }

  render() {

    const email = this.state.email
    const emailInValid = validateEmailAdress(email)
    const content = this.state.content
    const heritage = this.state.heritage
    const inheritanceFrom = this.state.inheritanceFrom
    const inheritanceType = this.state.inheritanceType
    const value = this.state.value
    const textInValid = validateTextfield(content)
    const textLength_1 = 2000-content.length
    const textLength_2 = 2000-heritage.length
    const tel = this.state.tel
    const Story = myStory(this.state.inheritanceBattle)

    if (this.state.submitted) {
      return <Success />
    }

   return (
    <div>
    <Section>
      <Question>
        <Interaction.H3>
          Was denken Sie: Von wem werden Sie am meisten erben?
        </Interaction.H3>
      </Question>
      <Radio
        value='Grosseltern'
        checked={this.state.inheritanceFrom === 'Grosseltern'}
        onChange={(e, value) => {
          this.setState({inheritanceFrom: e.target.value, inheritanceFromA: false})
        }}>
        Grosseltern
      </Radio>
      <br />
      <Radio
        value='Eltern'
        checked={this.state.inheritanceFrom === 'Eltern'}
        onChange={(e, value) => {
          this.setState({inheritanceFrom: e.target.value, inheritanceFromA: false})
        }}>
        Eltern
      </Radio>
      <br />
      <Radio
        value='Onkel/Tante'
        checked={this.state.inheritanceFrom === 'Onkel/Tante'}
        onChange={(e, value) => {
          this.setState({inheritanceFrom: e.target.value, inheritanceFromA: false})
        }}>
        Onkel/Tante
      </Radio>
      <br />
      <Radio
        value='Andere'
        checked={this.state.inheritanceFromA === true}
        onChange={(e, value) => {
          this.setState({inheritanceFromA: true, inheritanceFrom: ""})

        }}>
        Andere
      </Radio>
      <div
        style={{display: this.state.inheritanceFromA === true  ? "block" : "none"}}>
        <Field
          label='Vererbende'
          value={this.state.inheritanceFrom}
          onChange = {(e, value) => {
            this.setState({inheritanceFrom: value})
          }}
        />
      </div>
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Mit wie vielen Personen werden Sie Ihren Erbteil vermutlich teilen?
        </Interaction.H3>
      </Question>
      <Field
        value={this.state.count}
        onChange={(_, value) => this.setState({count: +value || 0})}
        onInc={() => this.setState({count: this.state.count + 1})}
        onDec={() => this.setState({count: this.state.count - 1})} 
      />
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Und was werden Sie in erster Linie erben?
        </Interaction.H3>
      </Question>
      <Radio
        value='Bargeld'
        checked={this.state.inheritanceType === 'Bargeld'}
        onChange={(e, value) => {
          this.setState({inheritanceType: e.target.value, inheritanceTypeA: false})
        }}>
        Bargeld
      </Radio>
      <br />
      <Radio
        value='Immobilien'
        checked={this.state.inheritanceType === 'Immobilien'}
        onChange={(e, value) => {
          this.setState({inheritanceType: e.target.value, inheritanceTypeA: false})
        }}>
        Immobilien
      </Radio>
      <br />
      <Radio
        value='Aktien'
        checked={this.state.inheritanceType === 'Aktien'}
        onChange={(e, value) => {
          this.setState({inheritanceType: e.target.value, inheritanceTypeA: false})
        }}>
        Aktien
      </Radio>
      <br />
      <Radio
        value='Fonds-Anteile'
        checked={this.state.inheritanceType === 'Fonds-Anteile'}
        onChange={(e, value) => {
          this.setState({inheritanceType: e.target.value, inheritanceTypeA: false})
        }}>
        Fondsanteile
      </Radio>
      <br />
      <Radio
        value='Firmen'
        checked={this.state.inheritanceType === 'Firmen'}
        onChange={(e, value) => {
          this.setState({inheritanceType: e.target.value, inheritanceTypeA: false})
        }}>
        Eine oder mehrere Firmen
      </Radio>
      <br />
      <Radio
        value='Andere'
        checked={this.state.inheritanceTypeA === true}
        onChange={(e, value) => {
          this.setState({inheritanceType: "", inheritanceTypeA: true})
        }}>
        Anderes
      </Radio>
       <div
        style={{display: this.state.inheritanceTypeA === true  ? "block" : "none"}}>
        <Field
          label='Ihr Erbe'
          value={this.state.inheritanceType}
          onChange = {(e, value) => {
            this.setState({inheritanceType: value})
          }}
        />
      </div>
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Was denken Sie, was könnte Ihr Erbteil wert sein?
        </Interaction.H3>
      </Question>
     <Field
        label='In Schweizer Franken'
        value={this.state.value}
        onChange = {(e, value) => {
           this.setState({value: value})
         }}
      />
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Hat man sich in Ihrer Familie schon einmal um ein Erbe gestritten (mit Ihnen oder ohne Sie)?*
        </Interaction.H3>
      </Question>
      <Radio
        value='yes'
        checked={this.state.inheritanceBattle}
        onChange={(e) => {
          this.setState({inheritanceBattle: true})
        }}>
        Ja
      </Radio>
      <br />
      <Radio
        value='no'
        checked={!this.state.inheritanceBattle}
        onChange={(e) => {
          this.setState({inheritanceBattle: false})
        }}>
        Nein
      </Radio>
      <br />
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          {Story}*
        </Interaction.H3>
      </Question>
      <Field
        label="Ihre Antwort"
        error={content && textInValid}
        value={this.state.content}        
        renderInput={(inputProps) => (
          <AutosizeInput
            {...styles.autoSize}
            {...inputProps}
          />
         )}
        onChange={(e) => {
          this.setState({content: e.target.value})
        }}
      />
      <div style={{display:"flex", justifyContent: "flex-end"}}>
        <Label style={{
          marginTop: -10,
          transition: "opacity 400ms",
          opacity: textLength_1 < 200 ? 1 : 0
        }}>noch {textLength_1} Zeichen</Label>
      </div>
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Was werden Sie Ihren Hinterbliebenen vererben?
        </Interaction.H3>
      </Question>
      <Field
        label="Denken Sie auch an Schmuck etc."
        error={heritage && textInValid}
        value={this.state.heritage}
        renderInput={(inputProps) => (
          <AutosizeInput
            {...styles.autoSize}
            {...inputProps}
          />
        )}
        onChange={(e) => {
          this.setState({heritage: e.target.value})
        }}
      />
      <div style={{display:"flex", justifyContent: "flex-end"}}>
          <Label style={{
          marginTop: -10,
          transition: "opacity 400ms",
          opacity: textLength_2 < 200 ? 1 : 0
        }}>noch {textLength_2} Zeichen</Label>
      </div>
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Zu guter Letzt: Haben Sie Ihr Testament schon geschrieben?
        </Interaction.H3>
      </Question>
      <Radio
        value='yes'
        checked={this.state.testament}
        onChange={(e) => {
          this.setState({testament: true})
        }}>
        Ja
      </Radio>
      <br />
      <Radio
        value='no'
        checked={!this.state.testament}
        onChange={(e) => {
          this.setState({testament: false})
        }}>
        Nein
      </Radio>
      <br />
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Fast geschafft. Damit wir Sie kontaktieren können, bräuchten wir nur noch Ihre E-Mail-Adresse.*
        </Interaction.H3>
      </Question>
      <Field
        label='Ihre E-Mail-Adresse'
        type= "email"
        value={email}
        error={this.state.validateEmail && emailInValid}
        onChange = {(e, value, isValidating) => {
          this.setState({email: value, validateEmail: isValidating})
        }}
      />
    </Section>

    <Section>
      <Question>
        <Interaction.H3>
          Noch besser – aber nicht unbedingt notwendig – wäre Ihre Telefonnummer.
        </Interaction.H3>
      </Question>
      <Field
        label='Ihre Telefonnummer'
        type= "tel"
        value={this.state.tel}
        onChange = {(e, value) => {
           this.setState({tel: value})
         }}
      />
    </Section>

    <Section>
      <div style={{marginTop:10, display:"flex", justifyContent: "flex-end"}}>
      {this.state.loading ?
        <InlineSpinner size={26} />
        :<Button
          disabled={emailInValid || textInValid || this.state.content === ""}
          primary
          onClick={() => {
            this.setState({loading: true})
            this.props.onSubmit(this.state)
              .then(() => this.setState({ submitted: true }))
              .catch((err) => {
                this.setState({
                  loading: false,
                  error: errorToString(err)
                })
              })
          }}
        >
          Senden
        </Button>
        }
      </div>
    </Section>

    <Section>
      <div style={{marginTop:10, display:"flex", justifyContent: "center"}}>
       {this.state.error &&
         <Interaction.P style={{color: colors.error}}>{this.state.error}</Interaction.P>
       }
      </div>
    </Section>

  </div>
  ); //return end
 } //render end
} //form end

const query = gql`
  query myContactDetails {
    me {
      id
      email
      phoneNumber
    }
  }
`
const mutation = gql`
  mutation submitStory($email: String!, $content: String!, $tel: String, $count: Int, $inheritanceFrom: String, $inheritanceType: String, $value: String, $inheritanceBattle: Boolean, $heritage: String, $testament: Boolean ) {
    submitInheritanceStory(email: $email, content: $content, tel: $tel, count: $count, inheritanceFrom: $inheritanceFrom, inheritanceType: $inheritanceType, value: $value, inheritanceBattle: $inheritanceBattle, heritage: $heritage, testament: $testament)
}`

const FormWithQuery = compose(
  graphql(query),
  graphql(mutation, {
    props: ({ mutate }) => ({
      onSubmit: ({email, content, tel, count, inheritanceType, inheritanceFrom, value, inheritanceBattle, heritage, testament}) =>
        mutate({ variables: { email, content, tel, count, inheritanceType, inheritanceFrom, value, inheritanceBattle, heritage, testament} })
    })
  })
)(Form)

class Success extends Component {
  render() {
    return  (
      <div style={{minHeight:300,display: "flex", alignItems: "center", justifyContent:"center"}}>
        <Interaction.H3>Vielen Dank für Ihre Teilnahme.</Interaction.H3>
      </div>
    )
  }
}

export default FormWithQuery;
