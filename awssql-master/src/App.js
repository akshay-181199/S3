  import React,{Component} from 'react';
  import './App.css';
  import tachyons from 'tachyons';
  import Select from 'react-select';
  import axios from 'axios';

  const def_state = {'states': {'value':'','label':'','link':''}}


  class App extends Component {


  constructor(props)
  {
    super(props);
    this.state={
      seldate:new Date(),
      days:'',
      country: {'value':'','label':''},
      states: {'value':'','label':'','link':''},
      response:{error:{}},
      filename:''
    }

  }

    handleChange1 = (selectedOption) => {
      this.setState(def_state);
      this.setState({country:selectedOption},() => {
      
    //  console.log(this.state);
      document.getElementById('countrydisplay').value=this.state.country.label;
      document.getElementById('statedisplay').value=this.state.states.label;

  })  };

    handleChange2 = (selectedOption) => {
      this.setState({states: selectedOption},() => {
      document.getElementById('statedisplay').value=this.state.states.label; 
  }) }


  handleChange = (event) => {
      event.preventDefault();
      const {name,value} = event.target;
      this.setState({[name]:value});
    //console.log(name+" "+value);
    //console.log(this.state);


  	  var today = new Date();
      var date3 = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

      var date1 = new Date(date3); 
      var date2 = new Date(value);
     
      const diffTime = (date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      console.log(diffDays-1); 
       document.getElementById('days').value=diffDays-1;
        this.setState({days:diffDays-1})
      console.log(this.state);

  }
    
  onChange =  (seldate) => {
     
      this.setState({ seldate })
     // var dayselect=moment(seldate).format('DD-MM-YYYY');
     // var today=moment(new Date()).format('DD-MM-YYYY');
      console.log(seldate);
      var one_day=1000*60*60*24;
      var x=seldate-new Date();
      x=Math.round(x/one_day);

     document.getElementById('days').value=x;
      this.setState({days:x})
  }

  printstate=(e)=>
  {
    console.log(this.state);
  }

  handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    if(this.state.filename!='')
  data.append( 'profileImage', this.state.filename, this.state.filename.name );
  console.log("UPLOADING IMAGE");
  axios.post( 'http://localhost:3001/img', data, {
      headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
      }
     })
      .then( ( response ) => {
  if ( 200 === response.status ) {
        // If file size is larger than expected.
        if( response.data.error ) {
         if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
         alert( 'Max size: 2MB');
         } else {
          console.log( response.data );
  // If not the given file type
          alert( response.data.error );
         }
        } 
        else {
         // Success
         let fileName = response.data;
         if(fileName==='Error: No File Selected')
         alert("SELECT A FILE!!!!");

         if(fileName!='Error: No File Selected')
         alert( 'File Uploaded' );
        }
       }
    else {
     // if file not selected throw error
   console.log( 'Please upload file'+ 'red' );
    }
    

      }).catch( ( error ) => {
      // If another error
       console.log( error+ 'red' );
     });
    } 
    



  handleSubmit = (event) => {

  event.preventDefault();


  fetch('http://localhost:3001/',{
  method:'post',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    seldate:this.state.seldate,
    days:this.state.days,
    country:this.state.country.label,
    states:this.state.states.label
  })
  }).then(res=> res.json())
  .then(data=>{this.setState({response:JSON.parse(data)})})
  .then(x=>{
   if(JSON.stringify(this.state.response.error)==='null')
  { 
   alert('Record insertion done. S3 File upload started');
  this.handleUpload(event);


  }
  else
    alert("Error inserting. Please follow all restrictions:"+JSON.stringify(this.state.response.error));

  })

  }


  upload=(e)=>{
    console.log(e.target.files[0]);
    this.setState({filename:e.target.files[0]});
  }



  render(){
    
      const options1 = [
        {value: 'in', label: 'India'},
        {value: 'aus', label: 'Australia'},
        {value: 'sa', label: 'South Africa'},
        {value: 'ban', label: 'Bangladesh'},
        {value: 'eng', label: 'England'},

      ];

      const options2 = [
        {value: 'tn', label: 'Tamilnadu', link: 'in'},
        {value: 'wb', label: 'West Bengal', link: 'in'},
        {value: 'kl', label: 'Kerala', link: 'in'},
        {value: 'jk', label: 'Jammu & Kashmir', link: 'in'},
        {value: 'jh', label: 'Jharkhand', link: 'in'},
        {value: 'mel', label: 'Melbourne', link: 'aus'},
        {value: 'syd', label: 'Sydney', link: 'aus'},
        {value: 'br', label: 'Brisbane', link: 'aus'},
        {value: 'ho', label: 'Hobart', link: 'aus'},
        {value: 'ad', label: 'Adelaide', link: 'aus'},
        {value: 'ct', label: 'Capetown', link: 'sa'},
        {value: 'db', label: 'Durban', link: 'sa'},
        {value: 'pe', label: 'Port Elizabeth', link: 'sa'},
        {value: 'bf', label: 'Bloemfontein', link: 'sa'},
        {value: 'jb', label: 'Johannesburg', link: 'sa'},
        {value: 'cg', label: 'Chittagong', link: 'ban'},
        {value: 'dk', label: 'Dhaka', link: 'ban'},
        {value: 'bs', label: 'Barisal', link: 'ban'},
        {value: 'rs', label: 'Rajshahi', link: 'ban'}, 
        {value: 'lan', label: 'Lancashire', link: 'ban'},
        {value: 'wor', label: 'Worcestershire', link: 'eng'},
        {value: 'notts', label: 'Nottingham', link: 'eng'},
        {value: 'war', label: 'Warwickshire', link: 'eng'},
        {value: 'deb', label: 'Derbyshire', link: 'eng'},
        {value: 'co', label: 'Comilla', link: 'ban'}
          
      


      ];

      const filteredOptions = options2.filter((o) => (o.link=== this.state.country.value))
   
    return (
      <div className="App">
        
  <div className="tc card border-success mb-3" >
    <div className="card-body text-success">
      <h5 className="ca">REACT</h5>
      
    </div>
  </div>


  <div className='formwarp'>
  <form>
  <div className='wrap'>
    <div className="form-group col-md-10">
      <label htmlFor="seldate">Date</label>
  <input type='date' className="seldate" id="seldate" onChange={this.handleChange} name="seldate"/>

  {/*
   <DatePicker
    className="seldate"
    selected={this.state.seldate}
    minDate={new Date()}
    onChange={this.onChange}
    maxDate={addDays(new Date(), 30)}
     />
   */} 
    </div>
    <div className="form-group col-md-10">
      <label htmlFor="Days">Days</label>
      <input type="text" className="form-control" id="days" name="days" readOnly />
    </div>
    <div className="form-group col-md-10">
        <label htmlFor="Country">Country</label>
          <Select
            name="country"
            dateFormat="yyyy/MM/dd"
            value={this.state.country.value}
            onChange={this.handleChange1}
            options={options1}
          />
           <input type="text" className="form-control" id="countrydisplay" disabled />
           


      </div>

    <div className="form-group col-md-10">
        <label htmlFor="State">State</label>


          <Select
            name="states"
            value={this.state.states.value}
            onChange={this.handleChange2}
            options={filteredOptions}
          required/>
  <input type="text" className="form-control" id="statedisplay" disabled />

      </div>

  <input type='file' onChange={this.upload}/>


    <div className="form-group col-md-10">
        <label htmlFor="State" onClick={this.printstate}>Check State Variables</label>

      </div>


    <input type='submit' onClick={this.handleSubmit} className="btn btn-primary"/>
  </div>

  </form>
  </div>
     </div>
    );

  }}

  export default App;
