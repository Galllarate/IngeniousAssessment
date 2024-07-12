import {describe, expect, it, afterEach} from "vitest";
import {mount} from "@vue/test-utils";
import SelectBusLine from "@/components/splitted/busLines/SelectBusLine.vue";

describe('SelectBusLine', () => {
    let wrapper: any


    const createComponent = () => {
        wrapper = mount(SelectBusLine, {})
    }

    afterEach(() => {
        wrapper.unmount()
    })

    it('should be exist', () => {
        createComponent()

        expect(SelectBusLine).toBeTruthy()
    });

    it('should contain correct title by default', () => {
        const CORRECT_TITLE = 'Select Bus Line'

        createComponent()

        expect(wrapper.text()).toContain(CORRECT_TITLE)
    });

    it('should contain buttons list', () => {
        createComponent()

        const button = wrapper.find('button')

        expect(button.exists()).toBeTruthy()
    });
})