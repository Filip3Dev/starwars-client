import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Hero from '@/components/Hero.vue';

describe('Hero.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Start Wars Quiz !';
    const wrapper = shallowMount(Hero, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
