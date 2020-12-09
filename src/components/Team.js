import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/player';
import { pinTeam } from '../actions/team';

class Team extends Component {

    state = {
        teamA: [],
        teamB: [],
        counter1: 0,
        counter2: 0,
        duplicateList: [],
        common: '',
        btnText: 'Make Teams',
        btnText2: 'Pin this Teams'
    }

    makeTeam = () => {
        if (this.props.players.length>=2) {
            this.setState({
                btnText: 'Making...'
            })
            this.setState({
                teamA: [],
                teamB: []
            })
            this.setState({
                counter1: 0,
                counter2: 0
            })
            this.setState({
                duplicateList: this.props.players.slice()
            }, () => {
                if (this.state.duplicateList.length % 2 !== 0) {
                    let randomIndex = Math.floor(Math.random() * this.state.duplicateList.length);
                    this.setState({
                        common: this.state.duplicateList[randomIndex]
                    }, () => {
                        let tempArr = [...this.state.duplicateList];
                        tempArr.splice(randomIndex, 1);
                        this.setState({
                            duplicateList: tempArr
                        }, () => {
                            setTimeout(this.makeTeamA, 2000);
                        })
                    })
                } else {
                    setTimeout(this.makeTeamA, 2000);
                }
            })
        }
    }

    makeTeamA = () => {
        if (this.state.counter1 <= this.state.duplicateList.length / 2) {
            let randomIndex = Math.floor(Math.random() * this.state.duplicateList.length);
            this.setState({
                teamA: [...this.state.teamA, this.state.duplicateList[randomIndex]]
            }, () => {
                let tempArr = [...this.state.duplicateList];
                tempArr.splice(randomIndex, 1);
                this.setState({
                    duplicateList: tempArr
                }, () => {
                    this.setState({
                        counter1: this.state.counter1 + 1
                    }, () => {
                        setTimeout(this.makeTeamA, 0)
                    })
                })
            })
        } else {
            this.makeTeamB();
        }
    }

    makeTeamB = () => {
        if (this.state.counter2 <= this.state.duplicateList.length) {
            let randomIndex = Math.floor(Math.random() * this.state.duplicateList.length);
            this.setState({
                teamB: [...this.state.teamB, this.state.duplicateList[randomIndex]]
            }, () => {
                let tempArr = [...this.state.duplicateList];
                tempArr.splice(randomIndex, 1)
                this.setState({
                    duplicateList: tempArr
                }, () => {
                    this.setState({
                        counter2: this.state.counter2 + 1
                    }, () => {
                        setTimeout(this.makeTeamB, 0)
                    })
                })
            })
        } else {
            this.setState({
                btnText: 'Make Teams'
            })
        }
    }

    componentDidMount() {
        const params = JSON.stringify({
            groupID: localStorage.getItem('groupID')
        });
        this.props.fetchPlayers(params);
    }

    handlePin = () => {
        const params = {
            groupID: this.props.groupID,
            teamA: this.state.teamA.map(e=>e.player),
            teamB: this.state.teamB.map(e=>e.player),
            common: this.state.common.player
        }
        this.props.pinTeam(JSON.stringify(params))
    }

    render() {
        return (
            <>
                <button onClick={() => this.makeTeam()} disabled={this.state.btnText === 'Making...'}>{this.state.btnText}</button>
                {this.state.common && <h3>Common: {this.state.common.player}</h3>}
                <div className="teams">
                    <div className="teamA">
                        <h3>Team A</h3>
                        {this.state.teamA && this.state.teamA.length > 0 && <ul>
                            {this.state.teamA.map((player, index) => (
                                <li key={index}>{player.player}</li>
                            ))}
                        </ul>}
                    </div>
                    <div className="teamB">
                        <h3>Team B</h3>
                        {this.state.teamB && this.state.teamB.length > 0 && <ul>
                            {this.state.teamB.map((player, index) => (
                                <li key={index}>{player.player}</li>
                            ))}
                        </ul>}
                    </div>
                </div>
                {this.state.teamA.length > 0 && this.state.teamB.length > 0 &&
                    <button onClick={this.handlePin} disabled = {this.props.loader}>{this.state.btnText2}</button>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    players: state.player.players,
    groupID: state.group.groupID,
    loader: state.team.loader
})

export default connect(mapStateToProps, { fetchPlayers, pinTeam })(Team);
