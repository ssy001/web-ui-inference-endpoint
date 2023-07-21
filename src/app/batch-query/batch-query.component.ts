import { Component, Input, OnInit } from '@angular/core';

import { topicId, topicIds, topicIdState, queryTopics } from '../topic-id';
import { AmlEndpointService } from '../aml-endpoint.service';

@Component({
  selector: 'app-batch-query',
  templateUrl: './batch-query.component.html',
  styleUrls: ['./batch-query.component.css']
})
export class BatchQueryComponent implements OnInit {
  batchQueryBox!: HTMLTextAreaElement;
  queries: string[] = [];
  @Input() queryTopicsArr: queryTopics[] = [];
  
  constructor(
    private endpointService: AmlEndpointService
  ) { 
    // this.queryTopicsArr = [
    //   { query: 'query 1', topics: ['Apple iPhones iPads', 'Home Monitoring', 'Promotion Discounts Packages'] },
    //   { query: 'query 2', topics: ['Apple Watch', 'Returns & Recycle', 'TV & Streaming'] },
    //   { query: 'query 3', topics: ['Internet', 'TV & Streaming', 'Wireless Roaming'] }
    // ]
  }

  ngOnInit(): void {
    this.batchQueryBox = document.getElementById('batch-query-box') as HTMLTextAreaElement;
    this.batchQueryBox.placeholder = 'Type your queries here, one line per query';    
  }

  submit(textarea: HTMLTextAreaElement): void {
    this.queryTopicsArr = [];
    let queriesStr = textarea.value;
    // console.log(`Textarea queries: \n${queriesStr}`);
    if (queriesStr) {
      this.queries = queriesStr.split('\n').filter(x => x) ;
      // console.log(`Queries array length: ${this.queries.length}`);
      // for (var q of this.queries) {
      //   console.log(`Query: ${q}`);
      // }
  
      this.endpointService.getBatchPrediction(this.queries).subscribe(
        data => {
          let predArr = this.endpointService.stringify_aml_response(data).split('\n');

          let queriesLength = this.queries.length;
          this.queryTopicsArr.push({query: this.queries[0], topics: predArr[0].split(',')});

          let idx = 1;
          let timer = setInterval(() => {
            if (idx < queriesLength) {
              this.queryTopicsArr.push({query: this.queries[idx], topics: predArr[idx].split(',')});
              idx++;
            }
            else {
              clearInterval(timer);
            }
          }, 1000);

          // console.log(`Batch Query Response: \n${predArr}`);
          // for (let idx=0; idx<this.queries.length; idx++) {
          //   this.queryTopicsArr.push({query: this.queries[idx], topics: predArr[idx].split(',')});
          // }
          console.log(`After receiving response data: QueryTopicsArr length: ${this.queryTopicsArr.length}`);
          // print queryTopicsArr for validation
          console.log('===> Validating queryTopicsArr... ');
          for (let idx=0; idx<this.queryTopicsArr.length; idx++) {
            console.log(`Query: ${this.queryTopicsArr[idx]['query']} | Topics: ${this.queryTopicsArr[idx]['topics']}`);
          }
        }
      )

    }
    else {
      console.log('Please enter queries!!!');
    }
  }

  clear(textarea: HTMLTextAreaElement): void {
    textarea.value = '';
    this.queries = [];
    this.queryTopicsArr = [];
  }

}
