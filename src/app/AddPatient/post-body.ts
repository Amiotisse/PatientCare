export const postBody = ({ firstName, lastName , birthDate, gender}) => `<Patient xmlns="http://hl7.org/fhir">
    <meta>
        <versionId value="2" />
        <lastUpdated value="2020-01-06T13:27:32.304+00:00" />
    </meta>
    <text>
        <status value="generated" />
        <div xmlns="http://www.w3.org/1999/xhtml">
            <p>Patient: "${firstName} ${lastName}"</p>
        </div>
    </text>
    <identifier>
        <type>
            <coding>
                <system value="http://hl7.org/fhir/v2/0203" />
                <code value="NI" />
                <display value="National unique individual identifier" />
            </coding>
            <text value="IHI" />
        </type>
        <system value="http://ns.electronichealth.net.au/id/hi/ihi/1.0" />
        <value value="8003608166690503" />
    </identifier>
    <identifier>
        <use value="usual" />
        <type>
            <coding>
                <system value="http://hl7.org/fhir/v2/0203" />
                <code value="MME" />
            </coding>
        </type>
        <system value="urn:oid:1.2.36.146.595.217.0.1" />
        <value value="6666" />
        <period>
            <start value="2001-05-06" />
        </period>
        <assigner>
            <display value="Acme Healthcare" />
        </assigner>
    </identifier>
  <name>
  <use value="official" />
  <text value="${firstName} ${lastName}" />
  <family value="${lastName}" />
  <given value="${firstName}" />
  <prefix value="Mme" />
</name>
<telecom>
<system value="phone" />
<value value="+61481059995" />
<use value="mobile" />
</telecom>
  <gender value="${gender}"/>
<birthDate value="${birthDate}" />

    <address>
        <use value="work" />
        <line value="400 George Street" />
        <city value="Brisbane" />
        <state value="QLD" />
        <postalCode value="4000" />
        <country value="AUS" />
    </address>
    <maritalStatus>
        <coding>
            <system value="http://hl7.org/fhir/v3/MaritalStatus" />
            <code value="MME" />
            <display value="Married" />
        </coding>
    </maritalStatus>
</Patient>`;

