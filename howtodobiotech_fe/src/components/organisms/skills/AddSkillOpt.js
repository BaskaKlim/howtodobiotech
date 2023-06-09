import React, { Component } from "react";
import styles from "./AddSkillOpt.module.css";
import { connect } from "react-redux";
import { createSkillOpt } from "../../../actions/skills";

import SkillOptDataService from "../../../service/Skill.service";
import {
  MDBCardImage,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

import ButtonAdd from "../../atoms/common/ButtonAdd";
import ButtonBack from "../../atoms/common/ButtonBack";
import InputField from "../../atoms/common/InputField";
import CountriesSelect from "../../molecules/common/CountriesSelect";
import SkillCategoriesSelect from "../../molecules/skills/SkillCategoriesSelect";
import BiotechCategoriesSelect from "../../molecules/common/BiotechCategoriesSelect";

class SkillOptAddForm extends Component {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem("userId");

    this.state = {
      formData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        organizer: "",
        website: "",
        accountId: userId,
        countries: [],
        biotechCategories: [],
        skillCategories: [],
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleCountriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        countries: selectedOptions,
      },
    }));
  };

  handleBiotechCategoriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        biotechCategories: selectedOptions,
      },
    }));
  };

  handleSkillCategoriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        skillCategories: selectedOptions,
      },
    }));
  };
  createSkillOpt = () => {
    const {
      title,
      description,
      startDate,
      endDate,
      organizer,
      website,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state.formData;

    // Convert start and end dates to valid time values
    const formattedStartDate = new Date(`${startDate}T00:00:00`);
    const formattedEndDate = new Date(`${endDate}T23:59:59`);

    const data = {
      title,
      organizer,
      description,
      startDate: formattedStartDate.toISOString(),
      endDate: formattedEndDate.toISOString(),
      website,
      accountId: this.state.formData.accountId,
      countries: countries.map((country) => ({
        id: country.value.id,
        name: country.value.name,
      })),
      biotechCategories: biotechCategories.map((category) => ({
        id: category.value.id,
        name: category.value.name,
      })),
      skillCategories: skillCategories.map((skillCategory) => ({
        id: skillCategory.value.id,
        name: skillCategory.value.name,
      })),
    };

    SkillOptDataService.createSkillOpt(data)
      .then((response) => {
        console.log(response);
        alert("New opportunity to gain skill was created successfully!");
        window.location.reload(); // Refresh the webpage
      })
      .catch((error) => {
        console.log(error);
        console.log(data);
        alert("Failed to create skill opprotunity. Please try again.");
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      title,
      description,
      startDate,
      endDate,
      organizer,
      website,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state.formData;

    return (
      <MDBContainer fluid className={styles.container}>
        <MDBRow
          className={`${styles.row} d-flex justify-content-center align-items-center h-100`}
        >
          <MDBCol col="12" className={`${styles.column} m-5`}>
            <MDBCard className={`${styles.card} ${styles.cardAdd}`}>
              <MDBCardBody className={styles.cardBody}>
                <MDBRow>
                  <MDBCol
                    md="6"
                    className={`${styles.textCenter} ${styles.bgIndigo} ${styles.card} `}
                  >
                    <InputField
                      label="Title"
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Description"
                      id="description"
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Website"
                      id="website"
                      type="text"
                      name="website"
                      value={website}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Organizer"
                      id="organizer"
                      type="text"
                      name="organizer"
                      value={organizer}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Start Date"
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="End Date"
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={this.handleInputChange}
                    />

                    <SkillCategoriesSelect
                      value={skillCategories}
                      onChange={this.handleSkillCategoriesChange}
                    />
                    <BiotechCategoriesSelect
                      value={biotechCategories}
                      onChange={this.handleBiotechCategoriesChange}
                    />
                    <CountriesSelect
                      value={countries}
                      onChange={this.handleCountriesChange}
                    />
                  </MDBCol>
                  <MDBCol md="6">
                    <div className={styles.text}>
                      <h4
                        className={`${styles.heading} ${styles.headingNormal} ${styles.textWhite} `}
                      >
                        Add a opportunity <br />
                        to gain new skills!
                      </h4>
                      <p>
                        Internships, summer schools, academies, workshops or even
                        hackathons can be valuable experience. You are giving
                        the chance to young science talents grow. Thank you!
                      </p>
                    </div>
                    <div className={`${styles.imageColumn}`}>
                      <MDBCardImage
                        src="/assets/add_skill.jpg"
                        alt="Form Image"
                        className={`${styles.image}`}
                      />
                    </div>
                    <MDBRow>
                      <MDBCol
                        className={`${styles.textCenter} ${styles.buttons}`}
                      >
                        <ButtonAdd onClick={this.createSkillOpt} />
                        <ButtonBack onClick={this.goBack} />
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default connect(null, { createSkillOpt })(SkillOptAddForm);
