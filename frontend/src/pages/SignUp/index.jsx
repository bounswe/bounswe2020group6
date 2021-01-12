import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signUp, validateCode, infoUpdate } from "../../redux/auth/api";
import {
  getTags,
  getDepartments,
  getUniversities,
  getTitles,
  addTag,
  addTitle,
  addUniversity,
  addDepartment,
} from "../../redux/choices/api";

import { authClearMessagesAction } from "../../redux/auth/actions";

import LandingHeader from "../../components/LandingHeader";

import { footerStyle, Content } from "./style";

import { Layout, Row, Col, Form, Input, Checkbox, Select, Steps, Divider, message } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { FormWrapper, FormTitle, FormButton, FormLabel, AgreementModal } from "./style";
import theme from "../../theme";

const { Footer } = Layout;
const { Option } = Select;
const { Step } = Steps;

const SignUp = () => {
  const dispatch = useDispatch();
  const selector = useSelector;

  const [signUpForm] = Form.useForm();
  const [validationForm] = Form.useForm();
  const [infoUpdateForm] = Form.useForm();

  const tags = selector((state) => state.choices.tags);
  const departments = selector((state) => state.choices.departments);
  const universities = selector((state) => state.choices.universities);
  const titles = selector((state) => state.choices.titles);

  const [formStep, setFormStep] = React.useState(0);
  const [password, setPassword] = React.useState();

  const [addedItemName, setAddedItemName] = React.useState("");

  const signupSuccessMessage = selector((state) => state.auth.signupSuccessMessage);
  const signupFailMessage = selector((state) => state.auth.signupFailMessage);
  const signupLoading = selector((state) => state.auth.signupLoading);

  const validationSuccessMessage = selector((state) => state.auth.validationSuccessMessage);
  const validationFailMessage = selector((state) => state.auth.validationFailMessage);
  const validationLoading = selector((state) => state.auth.validationLoading);

  const infoUpdateSuccessMessage = selector((state) => state.auth.infoUpdateSuccessMessage);
  const infoUpdateFailMessage = selector((state) => state.auth.infoUpdateFailMessage);
  const infoUpdateLoading = selector((state) => state.auth.infoUpdateLoading);

  useEffect(() => {
    if (formStep === 2) {
      dispatch(getTags());
      dispatch(getDepartments());
      dispatch(getUniversities());
      dispatch(getTitles());
    }
    // eslint-disable-next-line
  }, [formStep]);

  useEffect(() => {
    // signup
    if (signupSuccessMessage) {
      message.success(signupSuccessMessage);
      moveToNextStep();
    }
    if (signupFailMessage) {
      message.error(signupFailMessage);
    }
    // validation
    if (validationSuccessMessage) {
      message.success(validationSuccessMessage);
      moveToNextStep();
    }
    if (validationFailMessage) {
      message.error(validationFailMessage);
    }
    // info update
    if (infoUpdateSuccessMessage) {
      message.success(infoUpdateSuccessMessage);
      redirectToPath("/home");
    }
    if (infoUpdateFailMessage) {
      message.error(infoUpdateFailMessage);
    }
    dispatch(authClearMessagesAction());
    // eslint-disable-next-line
  }, [
    signupSuccessMessage,
    signupFailMessage,
    validationSuccessMessage,
    validationFailMessage,
    infoUpdateSuccessMessage,
    infoUpdateFailMessage,
  ]);

  const validatePasswordAndConfirmPassword = (rule, value) => {
    if (value && value !== signUpForm.getFieldValue("password")) {
      return Promise.reject("Passwords don't match!");
    } else {
      return Promise.resolve();
    }
  };

  const signUpSubmit = function (values) {
    dispatch(signUp(values));
  };
  const validateSubmit = function (values) {
    dispatch(validateCode(values));
  };
  const infoSubmit = function (values) {
    dispatch(
      infoUpdate({
        affiliation: {
          university: values.university,
          department: values.department,
          title: values.title,
        },
        researchAreas: values.interests,
      })
    );
  };

  const moveToNextStep = function (e) {
    setFormStep((x) => x + 1);
  };

  const history = useHistory();

  const redirectToPath = (path) => {
    history.push(path);
  };

  const addUniversityHandler = () => {
    dispatch(addUniversity(addedItemName));
    setAddedItemName("");
  };

  const addDepartmentHandler = () => {
    dispatch(addDepartment(addedItemName));
    setAddedItemName("");
  };

  const addTitleHandler = () => {
    dispatch(addTitle(addedItemName));
    setAddedItemName("");
  };

  const addTagHandler = () => {
    dispatch(addTag(addedItemName));
    setAddedItemName("");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const agreement = () => {
    return <>
    <h2><strong>Terms and Conditions</strong></h2>

<p>Welcome to Akademise!</p>

<p>These terms and conditions outline the rules and regulations for the use of Akademise's Website, located at http://akademise.ml/.</p>

<p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Akademise if you do not agree to take all of the terms and conditions stated on this page.</p>

<p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

<h3><strong>Cookies</strong></h3>

<p>We employ the use of cookies. By accessing Akademise, you agreed to use cookies in agreement with the Akademise's Privacy Policy. </p>

<p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

<h3><strong>License</strong></h3>

<p>Unless otherwise stated, Akademise and/or its licensors own the intellectual property rights for all material on Akademise. All intellectual property rights are reserved. You may access this from Akademise for your own personal use subjected to restrictions set in these terms and conditions.</p>

<p>You must not:</p>
<ul>
    <li>Republish material from Akademise</li>
    <li>Sell, rent or sub-license material from Akademise</li>
    <li>Reproduce, duplicate or copy material from Akademise</li>
    <li>Redistribute content from Akademise</li>
</ul>

<p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Akademise does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Akademise,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Akademise shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

<p>Akademise reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

<p>You warrant and represent that:</p>

<ul>
    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
</ul>

<p>You hereby grant Akademise a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

<h3><strong>Hyperlinking to our Content</strong></h3>

<p>The following organizations may link to our Website without prior written approval:</p>

<ul>
    <li>Government agencies;</li>
    <li>Search engines;</li>
    <li>News organizations;</li>
    <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
</ul>

<p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

<p>We may consider and approve other link requests from the following types of organizations:</p>

<ul>
    <li>commonly-known consumer and/or business information sources;</li>
    <li>dot.com community sites;</li>
    <li>associations or other groups representing charities;</li>
    <li>online directory distributors;</li>
    <li>internet portals;</li>
    <li>accounting, law and consulting firms; and</li>
    <li>educational institutions and trade associations.</li>
</ul>

<p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Akademise; and (d) the link is in the context of general resource information.</p>

<p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

<p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Akademise. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

<p>Approved organizations may hyperlink to our Website as follows:</p>

<ul>
    <li>By use of our corporate name; or</li>
    <li>By use of the uniform resource locator being linked to; or</li>
    <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
</ul>

<p>No use of Akademise's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

<h3><strong>iFrames</strong></h3>

<p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

<h3><strong>Content Liability</strong></h3>

<p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

<h3><strong>Your Privacy</strong></h3>

<p>Please read Privacy Policy</p>

<h3><strong>Reservation of Rights</strong></h3>

<p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

<h3><strong>Removal of links from our website</strong></h3>

<p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

<p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

<h3><strong>Disclaimer</strong></h3>

<p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

<ul>
    <li>limit or exclude our or your liability for death or personal injury;</li>
    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
</ul>

<p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

<p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
    </>
  }

  const adderDropdown = (itemAddHandler) => (menu) => (
    <div>
      {menu}
      <Divider style={{ margin: "4px 0" }} />
      <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
        <Input
          style={{ flex: "auto" }}
          value={addedItemName}
          onChange={(e) => setAddedItemName(e.target.value)}
        />
        <div
          style={{ flex: "none", padding: "8px", display: "block", cursor: "pointer" }}
          onClick={itemAddHandler}
        >
          <PlusCircleTwoTone twoToneColor={theme.main.colors.first} /> Add item
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <AgreementModal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={null} style={{}}>
        {agreement()}
      </AgreementModal>
      <LandingHeader />
      <Content>
        <Row style={{ height: "50px" }} />
        <FormWrapper>
          <Row align="middle" justify="center">
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 16, offset: 0 }}
              lg={{ span: 9, offset: 0 }}
              align="middle"
              justify="center"
            >
              <Steps current={formStep} onChange={(current) => setFormStep(current)}>
                <Step title="Step 1" description="Signup" />
                <Step title="Step 2" description="Validate your email" />
                <Step title="Step 3" description="Additional information" />
              </Steps>
              <Divider />

              {/* Step 1 - Credentials  */}
              <Form onFinish={(values) => signUpSubmit(values)} form={signUpForm} layout="vertical">
                <Col
                  id="col-step1"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 16, offset: 0 }}
                  lg={{ span: 16, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 0 ? "block" : "none" }}
                >
                  <FormTitle>Sign Up</FormTitle>
                  <br />
                  <Input.Group compact>
                    <Form.Item
                      label={<FormLabel>Name</FormLabel>}
                      name="name"
                      style={{ width: "50%" }}
                      rules={[{ required: true, message: "Please enter your first name!" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={<FormLabel>Surname</FormLabel>}
                      name="surname"
                      style={{ width: "50%" }}
                      rules={[{ required: true, message: "Please enter your last name!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Input.Group>
                  <Form.Item
                    label={<FormLabel>Email</FormLabel>}
                    name="email"
                    rules={[{ required: true, message: "Please enter your email!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Password</FormLabel>}
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                  >
                    <Input.Password
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<FormLabel>Confirm Password</FormLabel>}
                    name="confirm-password"
                    rules={[
                      { required: true, message: "Please confirm your password!" },
                      { validator: validatePasswordAndConfirmPassword },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <FormButton loading={signupLoading} type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                  </Form.Item>
                </Col>
              </Form>

              {/* Step 2 - Verification */}
              <Form
                onFinish={(values) => validateSubmit(values)}
                form={validationForm}
                layout="vertical"
              >
                <Col
                  id="col-step2"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  lg={{ span: 18, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 1 ? "block" : "none" }}
                >
                  <FormTitle>Verify your e-mail</FormTitle>
                  <br />
                  <Form.Item
                    label={<FormLabel>Enter the verification code sent to your e-mail.</FormLabel>}
                    name="code"
                    rules={[{ required: true, message: "Please enter your verification code!" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <FormButton loading={validationLoading} type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                  </Form.Item>
                  <Row style={{ height: "70px" }} />
                </Col>
              </Form>

              {/* Step 3 - Interests    */}
              <Form
                onFinish={(values) => infoSubmit(values)}
                form={infoUpdateForm}
                layout="vertical"
              >
                <Col
                  id="col-step3"
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 14, offset: 0 }}
                  lg={{ span: 14, offset: 0 }}
                  align="left"
                  justify="left"
                  style={{ display: formStep === 2 ? "block" : "none" }}
                >
                  <FormTitle>Additional Information</FormTitle>
                  <br />
                  <Form.Item
                    label={<FormLabel>University</FormLabel>}
                    name="university"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please enter your university!" }]}
                  >
                    <Select
                      dropdownRender={adderDropdown(addUniversityHandler)}
                      showSearch
                      mode="single"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please choose your university."
                    >
                      {universities.map((x) => (
                        <Option key={x}>{x}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Department</FormLabel>}
                    name="department"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please enter your department!" }]}
                  >
                    <Select
                      dropdownRender={adderDropdown(addDepartmentHandler)}
                      showSearch
                      mode="single"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please choose your department."
                    >
                      {departments.map((x) => (
                        <Option key={x}>{x}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Title</FormLabel>}
                    name="title"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please enter your title!" }]}
                  >
                    <Select
                      dropdownRender={adderDropdown(addTitleHandler)}
                      showSearch
                      mode="single"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please choose your title."
                    >
                      {titles.map((x) => (
                        <Option key={x}>{x}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={<FormLabel>Research area interests</FormLabel>}
                    name="interests"
                    rules={[
                      { required: true, message: "Please select at least one area of interest!" },
                    ]}
                  >
                    <Select
                      dropdownRender={adderDropdown(addTagHandler)}
                      showSearch
                      mode="tags"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select at least one research interest"
                    >
                      {tags.map((x) => (
                        <Option key={x}>{x}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="terms-and-contitions"
                    valuePropName="checked"
                    rules={[
                      { required: true, message: "You have to accept the terms and conditions!" },
                    ]}
                  >
                    <Row><Checkbox></Checkbox><span style={{marginLeft: "4px"}}>I have read & accepted the</span> <span onClick={() => showModal()} style={{color: theme.main.colors.first, cursor: "pointer", marginLeft: "4px"}}> terms and conditions</span>.</Row>
                  </Form.Item>
                  <br />
                  <Form.Item>
                    <FormButton loading={infoUpdateLoading} type="primary" htmlType="submit">
                      Confirm
                    </FormButton>
                  </Form.Item>
                </Col>
              </Form>
            </Col>
          </Row>
        </FormWrapper>
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default SignUp;
