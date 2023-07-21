import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { topicId, topicIds, topicIdState, queryTopics } from '../topic-id';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit, OnChanges {
  @Input() qt?: queryTopics;
  predTopics: topicIdState[] = [];
  tempPredTopics: topicIdState[] = [];
  // dummy_qt: queryTopics = { query: 'Apple iPhone SIM card', topics: ['SIM', 'Apple Watch', 'Support'] };  // TEST only
  // temp_topics = ['Apple Watch', 'SIM', 'Support'];

  constructor() { 
    // this.qt = this.dummy_qt;
    // if (this.qt) {
    //   console.log('In constructor(): this.qt IS NOT EMPTY');
    // }
    // else {
    //   console.log('In constructor(): this.qt IS EMPTY');
    // }
  }

  ngOnInit(): void {
    // if (this.qt) {
    //   console.log('In ngOnInit(): this.qt IS NOT EMPTY');
    // }
    // else {
    //   console.log('In ngOnInit(): this.qt IS EMPTY');
    // }
    // TODO: create results array by using qt.topics to look up corresponding id from topicIds dict
    if (this.qt) {
      // this.tempPredTopics = topicIds
      //   .filter(x => this.qt?.topics.includes(x.topic))
      //   .map(x => (
      //     { 
      //       id: x.id, 
      //       topic: x.topic,
      //       predicted: true 
      //     } as topicIdState
      //   ));

      // let tempPredTopicsLength = this.tempPredTopics.length;
      // this.predTopics.push(this.tempPredTopics[0]);
      // let idx = 1;
      // let timer = setInterval(() => {
      //   if (idx < tempPredTopicsLength) {
      //     this.predTopics.push(this.tempPredTopics[idx]);
      //     idx++;
      //   }
      //   else {
      //     clearInterval(timer);
      //   }
      // }, 500);
      
      // this.predTopics = topicIds
      //   .filter(x => this.qt?.topics.includes(x.topic))
      //   .map(x => {
      //     return { 
      //       id: x.id, 
      //       topic: x.topic,
      //       predicted: true 
      //     } as topicIdState
      //   });
      // console.log(`In ngOnInit(): Filtered Topic IDs`);
      // for (var pred of this.predTopics) {
      //   console.log(`ID: ${pred.id}, Topic: ${pred.topic}, Predicted: ${pred.predicted}`);
      // }
    }
  }

  ngOnChanges(): void {
    // if (this.qt) {
    //   console.log('In ngOnChanges(): this.qt IS NOT EMPTY');
    //   console.log(`===> QT contents\nQuery: ${this.qt['query']}`);
    //   console.log(`Topics ${this.qt['topics'].join(', ')}`);
    // }
    // else {
    //   console.log('In ngOnChanges(): this.qt IS EMPTY');
    // }
    // TODO: create results array by using qt.topics to look up corresponding id from topicIds dict
    if (this.qt) {
      // let filtered_topicIds = topicIds
      // .filter(x => this.qt?.topics.includes(x.topic));
      // console.log(`In ngOnChanges(): Filtered Topic IDs`);
      // for (let top of filtered_topicIds) {
      //   console.log(`ID: ${top.id}, Topic: ${top.topic}`);
      // }
      this.tempPredTopics = topicIds
        .filter(x => this.qt?.topics.includes(x.topic))
        .map(x => (
          { 
            id: x.id, 
            topic: x.topic,
            predicted: true 
          } as topicIdState
        ));

      let tempPredTopicsLength = this.tempPredTopics.length;
      this.predTopics.push(this.tempPredTopics[0]);
      let idx = 1;
      let timer = setInterval(() => {
        if (idx < tempPredTopicsLength) {
          this.predTopics.push(this.tempPredTopics[idx]);
          idx++;
        }
        else {
          clearInterval(timer);
        }
      }, 500);

      // this.predTopics = topicIds
      //   .filter(x => this.qt?.topics.includes(x.topic))
      //   .map(x => (
      //     { 
      //       id: x.id, 
      //       topic: x.topic,
      //       predicted: true 
      //     } as topicIdState
      //   ));
      console.log(`In ngOnChanges(): Filtered and mapped Topic IDs`);
      for (let pred of this.predTopics) {
        console.log(`ID: ${pred.id}, Topic: ${pred.topic}, Predicted: ${pred.predicted}`);
      }
    }    
  }

  // convertToTopicIdState(temp_topicIds: topicId[]): topicIdState[] {
    
  // }

  // getUlStyles(): any {
  //   return {
  //     'opacity': 1,
  //     'visibility': 'visible',
  //   }
  // }

  getPredStyles(topicState: topicIdState): any {
    if (topicState.predicted === true) {
      return {
        'background-color': '#1976d2',
        'color': '#ffffff',
        // 'opacity': 1,
        // 'visibility': 'visible',
        // 'transition': 'opacity 1000ms ease 500ms, visibility 0s ease 0s',
        // '-webkit-transition': 'opacity 1000ms ease 500ms, visibility 0s ease 0s',
        // '-moz-transition': 'opacity 1000ms ease 500ms, visibility 0s ease 0s',
        // 'transition-duration': '2s',
        // '-webkit-transition-duration': '2s',
        // '-moz-transition-duration': '2s'
      }
    }
    else {
      return {
        'background-color': '#adccec',
        'color': '#000000'
      }
    }
  }
}
