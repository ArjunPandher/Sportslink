import React from 'react'
import Biography from '../ViewProfile/Biography'
import Images from './Images'
import Career from './Career'
import ProfileInfo from './ProfileInfo'
import Experience from './Experience'
import './profile.css'
import coolcat from '../images/coolcat.jpg'
import icedragon from '../images/icedragon.jpg'
import lebron from '../images/lebron.jpg'
import EditButton from './EditButton'
import {uid} from 'react-uid'
import InputBox from './InputBox'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.inputBox = React.createRef();
    }

    state = {
        contactClass: 'contact',
        /*user: {
            name: "Lebron James",
            image: lebron,
            images: [coolcat, icedragon],
            description: 'Point guard for the Los Angeles Lakers. 4 time NBA champion, 4x Finals MVP, 4x Regular Season MVP.',
            location: "Los Angeles, California",
            organization: "Los Angeles Lakers",
            sports:"Basketball",
            contact: "",
            accomplishments: ["4x NBA Champion", '4x NBA Finals MVP', '4x NBA MVP', '16x NBA All Star', '13x All-NBA First Team'],
            experience: [{id: '0', title: 'Point Guard', organization: 'Los Angeles Lakers', league: "NBA", stats: {'2019': '25 ppg, 10apg'},
            description: 'Led Lakers to a championship in the NBA Bubble 2020, averaging almost 30 ppg in the Finals against the Miami Heat',
            years: '2018-2020'},
            {id: '1', title: 'Small Forward', organization: 'Cleveland Cavaliers', league: "NBA", stats:{},
            description: 'Made the NBA Finals in all four years, came back from a 3-1 deficit and won a championship in the 2016 NBA FInals', years: '2014-2018'},
            {id: '2', title: 'Small Forward', organization: 'Miami Heat', league: "NBA", stats:{},
            description: 'Made the NBA Finals in all four years, delivered two championships and won Finals MVP in 2012 and 2013', years: '2010-2014'},
            {id: '3', title: 'Small Forward', organization: 'Cleveland Cavaliers', league: "NBA", stats:{},
            description: 'Took the team to an NBA Finals in 2009, averaged over 25 ppg', years: '2003-2010'}]
            }*/
    }

    handleButtonOff = (event) => {
        this.setState({addButtonClass: 'addExperienceButton'})

    }
    
    updateExperience = (id, title, organization, league, stats, description, years) => {
        console.log('-------------------------- update Experience ---------------------------')
        const {global} = this.props;
        console.log('this.props.experience');
        console.dir(global.experience);
        console.log('id', id);
        console.log('league', league);
        
        let experiences = global.experience;
        let i;
        for (i in experiences){
            console.dir(experiences[i])
            if (experiences[i].id == id){
                experiences[i].title = title;
                experiences[i].organization = organization;
                experiences[i].league = league;
                experiences[i].stats = stats;
                experiences[i].description = description;
                experiences[i].years = years;
            }
        }
        console.dir(global.experience)
       // this.render();
        //this.setState({experience: experiences});
    }

    addExperience = (id, title, organization, league, stats, description, years) => {
        const {global} = this.props;
        let experiences = global.experience;

        const experience= {
            id: id,
            title: title,
            organization: organization,
            league: league,
            stats: stats,
            description: description,
            years: years
        }
        experiences.push(experience);
        this.setState({}); // used to cause a page refresh upon adding the experience  
        //this.render();
        //this.setState({experience: experiences});
    }

    removeExperience = (id) => {
        const {global} = this.props;
        let experiences = global.experience;
        let i;
        for (i in experiences){
            console.dir(experiences[i])
            if (experiences[i].id == id){
                experiences.splice(i, 1);
            }
        }
        console.dir(global.experience)
        this.setState({}); // used to cause a page refresh upon adding the experience  
       // this.render();
        //this.setState({experience: experiences});
    }

    getExperienceById = (id) =>{
        const {global} = this.props;
        let experiences = global.experience;
        let i;
        for (i in experiences){
            console.dir(experiences[i])
            
            if (experiences[i].id == id){
                return experiences[i]
            }
        }
        console.dir(global.experience)

    }

    getAccomplishments = () =>{
        return this.props.global.accomplishments;
    }

    addAccomplishment = (id, accomplishment) =>{
        this.props.global.accomplishments.push(accomplishment);
        this.setState({}); // used to cause a page refresh upon adding the experience  
    }


    updateDescription = (newDescription) =>{
        this.props.global.description = newDescription;
        this.setState({}); // used to cause a page refresh upon adding the experience  
    }

    updateLocation = (location) =>{
        this.props.global.location = location;
        this.setState({}); // used to cause a page refresh upon adding the experience 
    }

    updateOrganization = (organization) =>{
        this.props.global.organization = organization;
        this.setState({}); // used to cause a page refresh upon adding the experience 
    }

    updateSports = (sports) =>{
        this.props.global.sports= sports;
        this.setState({}); // used to cause a page refresh upon adding the experience 
    }
    
    setBoxState = (newBoxState) =>{
        console.log('---- setting box state ------ ')
        this.inputBox.current.setBoxState(newBoxState);  
        this.inputBox.current.setDefaultValuesForState();
    }

    setIdToEdit = (eId) =>{
        this.inputBox.current.setIdToEdit(eId);
        this.inputBox.current.setDefaultValuesForState();
      }


    handleBiographyEditButtonClick = (event) => {
        this.setBoxState(5);
    }

    render(){
        const {global} = this.props;
        console.log('--------- Profile -----------------')
        console.log('this.state')
        console.dir(this.state)
        console.log('this.props')
        console.dir(this.props)
        console.log('global')
        console.dir(global)
        return <div className={(global.player) ? "userProfile" : "recruiterProfile"}>
            <div className="profileCard">
                <ProfileInfo user={global.name} global={global} setBoxState={this.setBoxState.bind(this)} />
                <div className='editSection'>
                <Biography description={global.description}/>
                <EditButton handleEditButtonClick={this.handleBiographyEditButtonClick.bind(this)}/>
                </div>

            </div>

            <div className="achievements">
                <div></div>
                <Experience experience={global.experience} updateExperience={this.updateExperience.bind(this)} setBoxState={this.setBoxState.bind(this)} setIdToEdit={this.setIdToEdit.bind(this)}/>
                <InputBox ref={this.inputBox} updateExperience={this.updateExperience.bind(this)} getExperienceById={this.getExperienceById.bind(this)} 
                    addExperience={this.addExperience.bind(this)} removeExperience={this.removeExperience.bind(this)} getAccomplishments={this.getAccomplishments.bind(this)} 
                    addAccomplishment={this.addAccomplishment.bind(this)} updateDescription={this.updateDescription.bind(this)} updateLocation={this.updateLocation.bind(this)}
                    updateOrganization={this.updateOrganization.bind(this)} updateSports={this.updateSports.bind(this)}
                    user={global}/> 
                <div className="profileRightColumn">
                <Images images={global.images}/>
                <Career accomplishments={global.accomplishments} setBoxState={this.setBoxState.bind(this)} setIdToEdit={this.setIdToEdit.bind(this)}/>
                </div>
                
            </div>
        </div>
    }
}

export default Profile