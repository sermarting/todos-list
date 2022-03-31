/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import TodoItem from '@/models/TodoItem';

describe('TodoList component', () => {
  const todoList = [
    new TodoItem(1, 'Task1'),
    new TodoItem(2, 'Task2'),
    new TodoItem(3, 'Task3'),
  ];

  it('check all todoItems are listed', () => {
    const wrapper = shallowMount(TodoList, {
      propsData: { todoList },
    });
    expect(wrapper.findAll('li')).to.have.lengthOf(3);
  });

  it('check items can be toggle', () => {
    const wrapper = shallowMount(TodoList, {
      propsData: { todoList },
    });
    const todoItem = wrapper.findAll('li').at(2).find('span');

    todoItem.trigger('click');

    expect(wrapper.emitted('toggle-item')?.[0][0].completed).to.be.true;
  });

  it('check if edit works well', async () => {
    const wrapper = shallowMount(TodoList, {
      propsData: { todoList },
    });
    const todoItem = wrapper.findAll('li').at(1).find('label');

    todoItem.trigger('dblclick');

    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');
    input.setValue('Task2Modified');
    input.trigger('blur');

    expect(wrapper.emitted('edit-item')?.[0][0].name).equal('Task2Modified');
  });
});
