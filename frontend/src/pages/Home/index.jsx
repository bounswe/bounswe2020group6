import React from "react";

import { Col } from "antd";
import Frame from "../../components/Frame";
import ContentCard from "../../components/ContentCard";
import PersonRecommendationCard from "../../components/PersonRecommendationCard";
import ProjectRecommendationCard from "../../components/ProjectRecommendationCard";
import {
  Main, 
  H1, 
  H2,
  H3
} from "./style";

const Home = () => {
  return (
    <Frame>
      <Main 
          xs={{span: 22, offset: 1}}
          sm={{span: 22, offset: 1}}
          md={{span: 22, offset: 1}}
          lg={{span: 14, offset: 5}}>
            <ContentCard
            title="Translational Studies in light of Semantic Embedding Engines"
            topnote="12/10/2019"
            summary="Ontologies as means for formally specifying the vocabulary and relationship of concepts are seen playing a key role on the Semantic Web. However, the Web’s distributed nature makes ontology translation one of the most difficult problems that web-based agents must cope with when they share information. Ontology translation is required when translating datasets, generating ontology extensions and querying through different ontologies. "
            footer="Edgard Guðmundur"
            />
            <ContentCard
            title="Extraterrastrial Food Production Units"
            topnote="20/10/2020"
            summary="Ontologies as means for formally specifying the vocabulary and relationship of concepts are seen playing a key role on the Semantic Web. However, the Web’s distributed nature makes ontology translation one of the most difficult problems that web-based agents must cope with when they share information. Ontology translation is required when translating datasets, generating ontology extensions and querying through different ontologies. "
            footer="Jens Søgaard"
            />
            <ContentCard
            title="A Study of Reactiveness in Liquid Semi-Conductors"
            topnote="20/10/2020"
            summary="Ontologies as means for formally specifying the vocabulary and relationship of concepts are seen playing a key role on the Semantic Web. However, the Web’s distributed nature makes ontology translation one of the most difficult problems that web-based agents must cope with when they share information. Ontology translation is required when translating datasets, generating ontology extensions and querying through different ontologies. "
            footer="Vladislav Kocúr"
            />
            <ContentCard
            title="Terraformation of Europa: A Challenge Beyond Worlds"
            topnote="23/10/2020"
            summary="Ontologies as means for formally specifying the vocabulary and relationship of concepts are seen playing a key role on the Semantic Web. However, the Web’s distributed nature makes ontology translation one of the most difficult problems that web-based agents must cope with when they share information. Ontology translation is required when translating datasets, generating ontology extensions and querying through different ontologies. "
            footer="Jihaad Hesbani"
            />
          </Main>
          <Col align="center"
          md={0}
          lg={{span: 5, offset: 0}}
          xl={{span: 4, offset: 1}}
          >
            <H3>Recommended users...</H3>
            <PersonRecommendationCard name="Yeliz Yenigünler" commoncolabsnum={0} />
            <PersonRecommendationCard name="Ali Velvez" commoncolabsnum={1} />
            <PersonRecommendationCard name="Bahar Gülsonu" commoncolabsnum={2} />
            <H3>Projects you might like...</H3>
            <ProjectRecommendationCard name="Bu bir projedir" />
            <ProjectRecommendationCard name="Bu bir projedir" />
            <ProjectRecommendationCard name="Bu bir projedir" />
          </Col>
    </Frame>
  );
};

export default Home;

