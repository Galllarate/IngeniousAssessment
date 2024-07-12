import {describe, expect, it, afterEach} from "vitest";
import {mount} from "@vue/test-utils";
import IngBox from "@/components/ui/box/IngBox.vue";
import {BoxStatuses} from "@/components/ui/box/enums";

describe('IngBox', () => {
    let wrapper: any


    const createComponent = () => {
        wrapper = mount(IngBox, {
            slots: {
                default: '<div  class="default-slot">Default Slot Content</div>',
            },
        })
    }

    afterEach(() => {
        wrapper.unmount()
    })

    it('should be exist', () => {
        createComponent()
        console.log(wrapper.html())
        expect(IngBox).toBeTruthy()
    });

    it('should be contain default status by default', () => {
        const CORRECT_TEXT = 'Default Slot Content'
        createComponent()

        expect(wrapper.text()).toContain(CORRECT_TEXT)
    })

    it('should show empty box if props were set', async () => {
        const CORRECT_TEXT = 'No data'
        createComponent()

        await wrapper.setProps({ status: BoxStatuses.empty })

        expect(wrapper.text()).toContain(CORRECT_TEXT)
    });

    it('should not show loading component by default', () => {
        createComponent()

        expect(wrapper.find('[data-test-id="ing-loader"]').exists()).toBeFalsy()
    });

    it('should show loading component if props were set',  async () => {
        createComponent()

        await wrapper.setProps({ status: BoxStatuses.loading })

        expect(wrapper.find('[data-test-id="ing-loader"]').exists()).toBeTruthy()
    });

    it('should be without heading by default', () => {
        const CORRECT_HEADING_TEXT = 'Heading'
        createComponent()

        expect(wrapper.text()).not.toContain(CORRECT_HEADING_TEXT)
    });

    it('should be display heading text if props were set', async () => {
        const CORRECT_HEADING_TEXT = 'Heading'
        createComponent()

        await wrapper.setProps({ heading: CORRECT_HEADING_TEXT })

        expect(wrapper.text()).toContain(CORRECT_HEADING_TEXT)
    });


    it('should contain empty text if props were set', async () => {
        const CORRECT_EMPTY_TEXT = 'There is no data yet'
        createComponent()

        await wrapper.setProps({ status: BoxStatuses.empty, emptyText: CORRECT_EMPTY_TEXT })

        expect(wrapper.text()).toContain(CORRECT_EMPTY_TEXT)
    });
})