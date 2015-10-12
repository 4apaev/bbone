var Vent = require('../dist/bbone').Vent
var evt = 'some';
var ctx = {a:1};

describe('Events', function() {
  var obj = new Vent
  it('should should be instance of `Vent`', () => obj.should.be.instanceof(Vent))
  it('should have vents and uid properties', ()=>{
    obj.should.have.propertyWithDescriptor('uid', { enumerable: false });
    obj.should.have.propertyWithDescriptor('vents', { enumerable: false });
  })
})

describe('Events:on', function() {
  var obj = new Vent
  var spy = sinon.spy();

  it(`should add "${evt}" event listener`, function(){
    obj.on(evt, spy)
    obj.should.have.propertyByPath('vents', evt).and.be.instanceof(Array).and.have.lengthOf(1)
  })

  it(`should add "${evt}" event listener with context`, function(){
    obj.on(evt, spy, ctx)
    obj.vents[evt][1].should.have.properties({ fx:spy, ctx:ctx })
  })

  it('should throw, when called without arguments',  function(){
    (function() { obj.on() }).should.throw()
  })
})

describe('Events:emit', function(){
  var obj = new Vent, spy = sinon.spy();
  obj.on(evt, spy, ctx);
  it(`should emit "${evt}" event in context`, function(){
    obj.emit(evt);
    spy.should.be.calledOn(ctx)
  })

  it(`should emit "${evt}" event with 2 arguments`, function(){
    obj.emit(evt, 1, 2);
    spy.should.be.calledWith(1, 2)
  })
})

describe('Events:once', function(){
  var obj = new Vent, spy = sinon.spy();
  obj.once(evt, spy, ctx);
  it(`should emit once a "${evt}" event in context`, ()=>{
    obj.emit(evt)
       .emit(evt);
    spy.should.be.calledOnce()
    spy.should.be.calledOn(ctx)
  })
})

describe('Events:off', function(){
  var agents = ['done','one','two','fail'].map(name => ({ name: name, spy: sinon.spy()}));
  var spy, obj = new Vent;

  afterEach(() => {
    obj.off();
    agents.forEach(x => obj.on(evt, x.spy));
    spy = sinon.spy();
  })

  it('should remove all listeners', function(){
    agents.forEach(x => obj.on(x.name, x.spy));
    obj.off();
    agents.forEach(x => obj.emit(x.name) && x.spy.should.have.callCount(0));
  })

  it(`should remove all "${evt}" listeners`, function(){
    obj.on('spy', spy)
        .off(evt)
        .emit('spy')
        .emit(evt);

    spy.should.have.callCount(1);
    agents.forEach(x => x.spy.should.have.callCount(0));
  })

  it(`should remove one "${evt}" listener`, function(){
    obj.on(evt, spy)
       .off(evt, spy)
       .emit(evt);

    spy.should.have.callCount(0);
    agents.forEach(x => x.spy.should.have.callCount(1));
  })
})

// it('should throw, when called without arguments',  ()=> ev.on().should.throw())
  // it('should throw, when called without event name', ()=> ev.on(one).should.throw())
  // it('should throw, when called without callback',   ()=> ev.on('err').should.throw())