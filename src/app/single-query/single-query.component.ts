import { Component, OnInit } from '@angular/core';

import { topicId, topicIds, topicIdState } from '../topic-id';
import { AmlEndpointService } from '../aml-endpoint.service';

@Component({
  selector: 'app-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.css']
})
export class SingleQueryComponent implements OnInit {
  topic_states: topicIdState[] = [];
  queryBox!: HTMLInputElement;
  query: string = '';
  predictions: string[] = [];

  constructor(
    private endpointService: AmlEndpointService
    ) { 
    this.populate_topics();
    
  }

  ngOnInit(): void {
    this.queryBox = document.getElementById('query-box') as HTMLInputElement;
    this.queryBox.placeholder = 'Type your query here';
  }

  search(query: string) {
    // console.log(`Query entered: ${query}`);  
    this.query = query;
  }

  getpred() {
    console.log(`Query to be predicted: ${this.query}`);
    this.endpointService.getSinglePrediction(this.query).subscribe(
      data => {
        this.predictions = (String(data)).split(",");
        console.log(`Response data:`);
        for (var pred of this.predictions) {
          console.log(pred);
        }
        this.highlightTopics();
      }
    );
  }

  highlightTopics(): void {
    for (var i=0; i<this.topic_states.length; i++) {
      if (this.predictions.includes(this.topic_states[i].topic)) {
        this.topic_states[i].predicted = true
      }
      else {
        this.topic_states[i].predicted = false
      }
    }
  }

  populate_topics(): void {
    for (var i=0; i<topicIds.length; i++) {
      let topic_state: topicIdState = {
        id: topicIds[i]['id'],
        topic: topicIds[i]['topic'],
        predicted: false
      }
      this.topic_states.push(topic_state);
    }
  }

  getPredStyles(topicState: topicIdState): any {
    if (topicState.predicted === true) {
      return {
        'background-color': '#1976d2',
        'color': '#ffffff'
      }
    }
    else {
      return {
        'background-color': '#d5e4f3',
        'color': '#777777'
      }
    }
  }
}
