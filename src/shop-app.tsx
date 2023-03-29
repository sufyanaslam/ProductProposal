import * as React from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import Button from "./components/button";
import ProductList from "./components/product-list";
import ProductProposalForm from "./components/product-proposal-form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";
import { fetchProducts, updateProduct } from "./services/api";

export class ShopApp extends React.Component<
  {},
  { products: any[]; isOpen: boolean; isShowingMessage: boolean; message: string; numFavorites: number; prodCount: number }
> {
  constructor(props: any) {
    super(props);

    this.favClick = this.favClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //removed api call from constructor as its a bad practice
    this.state = { products: [], isOpen: false, isShowingMessage: false, message: '', numFavorites: 0, prodCount: 0 };
  }
  async componentDidMount(){
    document.title = "Droppe refactor app"
    
    /*
      moved api call here and wrapped in try catch in to handle crash in case of api call failure
      api calls moved to separate network layer to increase the reusability, modularity and easy implementation of unit-tests.
    */
    
    try {
      let productList = await fetchProducts()
      this.setState({
        products: productList
      })
      this.setState({
        prodCount: productList.length
      })
    } catch (error) {}
  }

  favClick(title: string) {
    const prods = this.state.products;
    const idx = lodash.findIndex(prods, {title: title});
    let currentFavs = this.state.numFavorites
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }

    this.setState(() => ({ products: prods, numFavorites: totalFavs }));
  }

  async onSubmit(payload: {title: string; description: string; price: string}) {
    //updated the flow for product update, state should only update if the product is actually updated, removed timeout from message
    this.setState({
      isShowingMessage: true,
      message: "Adding product..."
    })

    try {
      let result = await updateProduct(payload)
      const updated = lodash.clone(this.state.products)

      if (result?.id) {
        updated.push({
          id: result.id,
          title: payload.title,
          description: payload.description,
          price: payload.price
        })

        this.setState({
          products: updated,
          prodCount: lodash.size(this.state.products) + 1
        })
      }
    } catch (error) {}

    this.setState({
      isOpen: false,
      isShowingMessage: false,
      message: ""
    })
  }

  render() {
    const { products, isOpen } = this.state;
    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={['container', styles.headerImageWrapper].join(' ')}>
            <img src={logo} className={styles.headerImage} />
          </div>
        </div>

        <>
           <span
              className={['container', styles.main].join(' ')}
              style={{margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly'}}
           >
            <img src={img1} style={{maxHeight: "15em", display: 'block'}} />
            <img src={img2} style={{maxHeight: "15rem", display: 'block'}} />
           </span>
        </>

        <div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
          <div className={styles.buttonWrapper}>
            <span role="button">
               <Button
                  onClick={function (this: any) {
                     this.setState({
                        isOpen: true,
                     });
                  }.bind(this)}
               >Send product proposal</Button>
            </span>
             {this.state.isShowingMessage && <div className={styles.messageContainer}>
                <i>{this.state.message}</i>
             </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {this.state.prodCount}</span>
            {' - '}
            <span>Number of favorites: {this.state.numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onFav={this.favClick} /> : <div></div>}
        </div>

        <>
           <Modal
              isOpen={isOpen}
              className={styles.reactModalContent}
              overlayClassName={styles.reactModalOverlay}
           >
              <div className={styles.modalContentHelper}>
                 <div
                    className={styles.modalClose}
                    onClick={function (this: any) {
                       this.setState({
                          isOpen: false,
                       });
                    }.bind(this)}
                 ><FaTimes /></div>

                 <ProductProposalForm
                    on-submit={this.onSubmit}
                 />
              </div>
           </Modal>
        </>
      </React.Fragment>
    );
  }
}
