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
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
            <ContentCard
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
            <ContentCard
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
            <ContentCard
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
            <ContentCard
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, velit."
            topnote="20/10/2020"
            summary="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsam nostrum distinctio repellendus quis necessitatibus facilis accusamus labore, suscipit vel iure fugit veritatis minus fugiat?"
            footer="User Name"
            />
          </Main>
          <Col align="center"
          md={0}
          lg={{span: 5, offset: 0}}
          xl={{span: 4, offset: 1}}
          >
            <H3>Recommended users...</H3>
            <PersonRecommendationCard name="Yeliz Yenigünler" commoncolabsnum={0} />
            <PersonRecommendationCard name="Yeliz Yenigünler" commoncolabsnum={1} />
            <PersonRecommendationCard name="Yeliz Yenigünler" commoncolabsnum={2} />
            <H3>Projects you might like...</H3>
            <ProjectRecommendationCard name="Bu bir projedir" />
            <ProjectRecommendationCard name="Bu bir projedir" />
            <ProjectRecommendationCard name="Bu bir projedir" />
          </Col>
    </Frame>
  );
};

export default Home;

