import React from 'react';
import ReactDOM from 'react-dom';
import logo from './admin_logo.png';
import './AdminAccountPage.css';
import { Button, Modal, Form, Input, notification, Table } from 'antd';
import { setComments, getAllUsers } from '../../../util/APIFunctions.js';


//import Button from 'react-bootstrap/Button'; {/* imports button styles and functions */}

{/* Button class for all attributes of buttons*/}
/*class Button extends React.Component{

   render(){
      const{
      color, variant, content, ...others
      } = this.props;

      return(
      <button className={color}{...others}>
      {content}
      </button>
      )
   }
}*/


const FormItem= Form.Item;
class AdminAccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  comment: '',
                  user: [],
                  visable: false,
                  visable2: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setVisable = this.setVisable.bind(this);
    this.setVisable2 = this.setVisable2.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.loadUser = this.saveUser.bind(this);
  }
  
  async handleEmailChange( email2, comment2) {
    this.setState({email: email2});
    await this.setState({comment: comment2});
    this.setVisable( true );
  }
  handleCommentChange(event) {
   this.setState({comment: event.target.value});
 }
 setVisable( b ){
   this.setState( { visable: b } );
}
async setVisable2( b ){
   await getAllUsers( )
   .then( response => {
       this.setState( {
           users: response
       });
    } )
   .catch(error => {
       notification.error({
           message: 'LCHS Band Fundraising',
           description:error.message || 'Sorry! Something went wrong!'
       });
   })
  this.setState( { visable2: b } );
}
   

 /* handleSubmit(event) {
//    
//    event.preventDefault();
//    const { name } = this.state;
//    const { email } = this.state;
//    alert('A name and email were submitted: ' + name + ' ' + email);
//    
//    /*UserDataService.retrieveUserInfo(name, email)
//      .then((res) => {
//         let user = res.data.result;
//         this.setState({
//            id: user.name
//         })
//      });
//    //const { id } = this.state;
//    this.props.history.push( "user/" + name + "/" + email);
}*/
   
   /*****************************************************************************************
    * Handler: handleClick - This handler will route the application to other existing pages.
    * This handler will be called on the button's click. 
    * Parameters: This handler takes one parameter representing the URL extension where the
    * page that will be accesses will be located.
    * Preconditions: None
    * Postconditions: The user will be rerouted to the correct page
    **************************************************************************************/
   handleClick = param => e => {
      e.preventDefault();
      this.props.history.push(param);
   }

   clicked(){
      console.log("button was clicked");
   }
 
   async setComment( b ){
      await setComments( this.state.email, this.state.comment )
      .then( response => {
         notification.success({
            message: 'LCHS Band Fundraising',
            description: "You have added a comment"
        })
       } )
      .catch(error => {
          notification.error({
              message: 'LCHS Band Fundraising',
              description:error.message || 'Sorry! Something went wrong!'
          });
      });
      this.setState( { visable: b } );
      this.setState( { comment: '' } );
   }

   render() {
      const columns = [
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
          title: 'Add comment',
          //dataIndex: 'action',
          key: 'action',
          render: (text, record) =>
              this.state.users.length >= 1 ? (
                <button onClick={ () => this.handleEmailChange( record.email, record.comments ) }>Add Comment</button>
              ) : null,
      },
  ];
      return (
         <form onSubmit={this.handleSubmit}> 
         {/* WELCOME TITLE */}
            <h1 class="title" align="center"> ADMIN ACCOUNT </h1> 
            <div>
                  {/* LOGO */}
                  <img src={logo} class="center" alt="logo" 
                  height={150}
                  width={150}/><br/>
                  <br/><br/>
            </div>
                <Modal
                  title="Add Comment"
                  centered
                  destroyOnClose={true}
                  visible={ this.state.visable }
                  onOk={ () => this.setComment( false ) }
                  onCancel={ () => this.setVisable( false ) }>
                 <Form>
                    <FormItem
                        label="Comment">
                        <Input 
                            name="comment"
                            size="large"
                            type="text" 
                            autocomplete="off"
                            placeholder="comments"
                            value={this.state.comment}
                            onChange={(event) => this.handleCommentChange(event) } maxLength="255"/>
                    </FormItem>
                  </Form>
               </Modal>
        <Modal
                  title="All Users"
                  centered
                  destroyOnClose={true}
                  visible={ this.state.visable2 }
                  onOk={ () => this.setVisable2( false ) }
                  onCancel={ () => this.setVisable2( false ) }>
                    
                <div className="table">
                    <Table 
                        dataSource={this.state.users} 
                        columns={columns} 
                        rowKey={(record) => record.userId}
                        bordered
                        pagination={false}
                        scroll={{ y: 500 }}
                    />
                </div>
               </Modal>
            <div> 
               <Button className="center" onClick={ this.handleClick("/campaigns") }> Campaign Configuration </Button> <br/>
               <Button className="center" onClick={ this.handleClick("/reset-password") }> Reset Customer Password </Button> <br/>
               <Button className="center" onClick={ this.handleClick("/admin-create-admin") }> Create an Administrator</Button> <br/>
               <Button className="center" onClick={ ( ) => this.setVisable2( true ) }> See All Users</Button> <br/>
               <Button className="center" onClick={ this.handleClick("/edit-info") }> Edit My Info</Button> <br/>
            </div>
         </form>
      );
   }
}


ReactDOM.render(
  <AdminAccountPage/>,
  document.getElementById('root')
);

export default AdminAccountPage;
