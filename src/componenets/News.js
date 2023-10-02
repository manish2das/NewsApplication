import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// export default class News extends Component {
// static defaultProps = { country: "in", pageSize: 8, category: "general" };

// static PropType = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// };
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // constructor(_props) {
  //   super();

  //   // this.state = {
  //   //   articles: [],
  //   //   loading: false,
  //   //   page: 1,
  //   //   totalResults: 0,
  //   // };
  // }

  const newUpdate = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5788429aff3a4581be23d9c55e517701&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    // this.setState({
    //   loading: true,
    // });
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  };

  useEffect(() => {
    newUpdate();
  }, []);
  // async componentDidMount() {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5788429aff3a4581be23d9c55e517701&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({
  //   //   loading: true,
  //   // });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // this.setState({
  //   //   articles: parseData.articles,
  //   //   totalResults: parseData.totalResults,
  //   //   loading: false,
  //   // });
  //   // console.log(parseData);
  //   this.newUpdate();
  // }

  // handleNextClick = async () => {
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.state.totalResults / props.pageSize)
  //   //   )
  //   // ) {
  //   //   console.log("Next");
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     props.country
  //   //   }&category=${
  //   //     props.category
  //   //   }&apiKey=5788429aff3a4581be23d9c55e517701&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${props.pageSize}`;
  //   //   this.setState({
  //   //     loading: true,
  //   //   });
  //   //   let data = await fetch(url);
  //   //   let parseData = await data.json();
  //   //   console.log(parseData);
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseData.articles,
  //   //     loading: false,
  //   //   });
  //   // }
  //   this.setState({ page: this.state.page + 1 });
  //   this.newUpdate();
  // };

  // handlePrevClick = async () => {
  //   // console.log("Previous");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=5788429aff3a4581be23d9c55e517701&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // this.setState({
  //   //   loading: true,
  //   // });
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseData.articles,
  //   //   loading: false,
  //   // });
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.newUpdate();
  // };

  const fetchMoreData = async () => {
    // this.setState({
    //   page: this.state.page + 1,
    // });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=5788429aff3a4581be23d9c55e517701&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
    // this.setState({
    //   articles: articles.concat(parseData.articles),
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
  };

  // render() {
  console.log("render");

  return (
    <div className="container">
      <h1 className="text-center" style={{ marginTop: "90px" }}>
        NewsMonkey-Top HeadLines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-5">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.moneycontrol.com/static-mcnews/2019/02/Sensex_nifty_BSE_NSE_traders-770x433.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between my-3">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};
// }
// }

News.defaultProps = { country: "in", pageSize: 8, category: "general" };

News.PropType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
