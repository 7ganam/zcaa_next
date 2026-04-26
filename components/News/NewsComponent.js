import React, { Component } from "react";
import { Container } from "reactstrap";
import ReactLoading from "components/shared/LoadingSpinner";
import NewsCardComponent from "./NewsCardComponent/NewsCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./NewsComponent.module.css";

export default class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.render_news = this.render_news.bind(this);
  }

  render_news() {
    let posts = this.props.news.map((post, index) => (
      <NewsCardComponent key={`${post._id}-${index}`} post={post} />
    ));

    return posts;
  }

  render() {
    return (
      <div className={styles.news_wrapper}>
        <Container className={styles.news_container}>
          {Object.keys(this.props.news).length === 0 ? (
            <div className={styles.loading_state}>
              <ReactLoading type={"spin"} color={"#00D2F9"} width={"10vw"} />
            </div>
          ) : (
            <>
              <section className={styles.news_hero}>
                <div>
                  <div className={styles.eyebrow}>ZCAA Dispatch</div>
                  <h1>News from the alumni network</h1>
                  <p>
                    Stories, announcements, and updates from the Zewail City
                    Alumni Association community.
                  </p>
                </div>
                <div className={styles.news_count}>
                  <span>{this.props.news.length}</span>
                  <small>published updates</small>
                </div>
              </section>

              <div className={styles.news_layout}>
                <aside className={styles.category_panel}>
                  <div className={styles.category_head}>Categories</div>
                  <button className={styles.category_chip} type="button">
                    General
                  </button>
                </aside>
                <section className={styles.cards_grid} id="news_cards_row">
                  {this.render_news()}
                </section>
              </div>
            </>
          )}
        </Container>
      </div>
    );
  }
}
