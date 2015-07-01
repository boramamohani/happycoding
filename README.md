## Description
- Repository를 fork해서 개발을 진행해주세요. 
- ./sources에 있는 디자인을 구현해주세요.
- datasource는 ./assets/javascripts/common.js 에 URL로 선언되어 있습니다.
- Twitter Bootstrap 기반으로 개발해주세요.
- framework, library, template engine, package manager 등은 자유롭게 사용하셔도(안 하셔도) 됩니다.
- jade(haml), sass, coffeescript(babeljs)등은 자유롭게 사용하셔도(안 하셔도) 됩니다.
- 웹서버 없이, 로컬 파일에서 열릴 수 있도록 해주세요. 
-------
#Data Sources
- country: 프랑스 상품에 대한 데이터입니다. 프랑스의 도시 정보도 포함되어 있습니다.  
- offers: 상품 데이터입니다. `city_info_id:integer` 값은 `country` 데이터의 `city_infos` 노드들의 `id:integer`와 릴레이션입니다.  
- guides: 해당 상품들과 관련된 가이드 정보입니다. offer 데이터의 `guide_id:integer`와 guides 노드의 `id:integer`와 릴레이션입니다.  
- currencies: 특정일에 관한 환률/통화 정보입니다. `rate` 값은 환률에 대한 비율로 USD를 기본 통화로 합니다. USD의 `rate` 값은 언제나 1.0 입니다.   
