import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import Loading from './components/Loading';
import BigImg from './components/BigImg';
import Table from './components/Table';

class App extends Component {

  state = {
    data: [],
    loading: true,
    bigImg: '',
    sortDirection: 'up',
    sortTriangle: '▲',
    sortField: 'id',
    current: 0,
  }

  async getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos')
    let data = await response.json();

    this.setState({
      data,
      loading: false,
    })
  }

  componentDidMount() {
    this.getData();   
  }

  showBigColor = (urlBigImg) => {
    this.setState({
      bigImg: urlBigImg,
    })   
  }

  closeBigImg = () => {
    this.setState({
      bigImg: ''
    })
  }

  sortUp = (a, b) => {
    if (a.id > b.id) return 1;
    if (a.id === b.id) return 0;
    if (a.id < b.id) return -1;
  }

  sortDown = (a, b) => {
    if (a.id > b.id) return -1;
    if (a.id === b.id) return 0;
    if (a.id < b.id) return 1;
  }

  sortingById = () => {
    const dataForSorting = this.state.data.concat();

    if(this.state.sortDirection === 'up') {
      dataForSorting.sort(this.sortDown);
      this.setState({
        data: dataForSorting,
        sortDirection: 'down',
        sortTriangle: '▼',
      })
      return dataForSorting
    } else {
      dataForSorting.sort(this.sortUp);
      this.setState({
        data: dataForSorting,
        sortDirection: 'up',
        sortTriangle: '▲',
      })
      return dataForSorting
    } 
  }

  handlePageClick = page => {
    this.setState({
      current: page.selected,
    });
  };


  



  render () {   
    const subData = [];
    const pageSize = 4;

    for (let i = 0; i <Math.ceil(this.state.data.length/pageSize); i++){
      subData[i] = this.state.data.slice((i*pageSize), (i*pageSize) + pageSize);
    }  

    const displayData = subData[this.state.current];



    return (

      <>
        {this.state.loading
          ? <Loading />
          : <div className='p-3 m-3'>
            
              {this.state.bigImg
                ? <BigImg 
                    bigImg={this.state.bigImg} 
                    closeBigImg={this.closeBigImg}/>
                : <>
                    <Table 
                      sortingById={this.sortingById}
                      sortTriangle ={this.state.sortTriangle}
                      displayData={displayData}
                      showBigColor={this.showBigColor} />

                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        pageCount={5000/pageSize}
                        marginPagesDisplayed={1}                      // количество страниц отображаемых после "..."
                        pageRangeDisplayed={2}                        // количество страниц +1 отображаемых до "..."
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        //initialPage={0}
                        forcePage={this.state.current}
                      />
                  </>  }                 
          </div>}                
      </>
    )
  }  
}

export default App;