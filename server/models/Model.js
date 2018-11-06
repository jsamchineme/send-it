class Model {
  constructor(entityAttributes, allRecords) {
    this.attributes = entityAttributes;
    this.allRecords = allRecords;
  }

  getAll() {
    return this.allRecords;
  }

  findById(id=null) {
    return this.allRecords.find(item => item.id === id);
  }

  create(data) {
    const newEntity = {};

    for (let attribute in this.attributes) {
      if (attribute !== 'id') {
        newEntity[attribute] = data[attribute];
      }
      if (attribute === 'createdAt') {
        newEntity[attribute] = new Date();
      }
      if (attribute === 'updatedAt') {
        newEntity[attribute] = new Date();
      }
    }
    const lastRecord = this.allRecords[this.allRecords.length - 1];
    newEntity.id = lastRecord.id;

    return newEntity;
  }

  update(id, data) {
    let entity = this.allRecords.find(item => item.id === id);

    this.attributes.forEach((attribute) => {
      if (attribute !== 'id') {
        updatedEntity[attribute] = data[attribute] || entity[attribute];
      }
    });

    return entity;
  }

  delete(id) {
    const records = this.allRecords.filter(item => item.id !== id);

    if (this.allRecords === newRecords.length) {
      return false;
    }
    this.allRecords = records;
    return true;
  }
}

export default Model;