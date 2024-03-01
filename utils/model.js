//Call for content type, get ids for type, elements, taxonomy groups, and required elements (necessary for author LI)
//Create constructor class reflecting these 

const client = require('./client');
class Post {
    constructor(typeData){
        this.titleElement = {
            id: typeData.elements[0].id,
            codename: typeData.elements[0].codename
        };

        this.authorElement = {
            id: typeData.elements[1].id,
            codename: typeData.elements[1].codename,
            allowedContentTypeId: typeData.elements[1].allowed_content_types[0].id
        };
        this.imageElement = {
            id: typeData.elements[2].id,
            codename: typeData.elements[2].codename,

        };
        this.gamesElement = {
            id: typeData.elements[3].id,
            codename: typeData.elements[3].codename,
            taxonomyGroup: typeData.elements[3].taxonomy_group.id
        };
        this.postTypeElement = {
            id: typeData.elements[4].id,
            codename: typeData.elements[4].codename,
            taxonomyGroup: typeData.elements[4].taxonomy_group.id

        };
        this.bodyCopyElement = {
            id: typeData.elements[5].id,
            codename: typeData.elements[5].codename,

        }
    
        
    }

    
}
async function constructType(){
    const contentTypeResponse = await client
    .viewContentType()
    .byTypeCodename('post')
    .toPromise();
    const postModel = new Post(contentTypeResponse.data)
    // console.log(postModel)
    return postModel;
    

}
module.exports = constructType;
