// file that runs that allow us to configure our test environment
// where we set up the enzyme adapter
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';
// takes all sorts of attributes
Enzyme.configure({
  adapter: new Adapter()
})

// adding env variables
DotEnv.config({ path: '.env.test'});
